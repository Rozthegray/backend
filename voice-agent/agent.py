import json
import os
from pathlib import Path

from dotenv import load_dotenv
from livekit import rtc
from livekit.agents import (
    Agent,
    AgentSession,
    JobContext,
    JobProcess,
    RunContext,
    WorkerOptions,
    cli,
    function_tool,
)
from livekit.plugins import openai

from db import log_lead_and_booking
from prompts import SYSTEM_INSTRUCTION

ENV_FILE = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=ENV_FILE, override=True)

FAST_PACING_ADDENDUM = """
Keep every spoken response crisp, direct, and easy to follow (1 to 2 short sentences max).
When the caller gives a long explanation, acknowledge the key point briefly and ask one clear next question rather than giving a long speech.
Ignore background music, ambient noise, or partial sounds; only respond to clear human speech directed at you.
"""


def prewarm(proc: JobProcess) -> None:
    # Touch environment/config early so child processes start fast
    proc.userdata["openai_api_key"] = os.getenv("OPENAI_API_KEY", "")


class ElevatorXAgent(Agent):
    def __init__(self, room: rtc.Room):
        super().__init__(instructions=f"{SYSTEM_INSTRUCTION}\n{FAST_PACING_ADDENDUM}")
        self._room = room
        self._greeted = False

    async def greet_once(self) -> None:
        if self._greeted:
            return
        self._greeted = True
        await self.session.generate_reply(
            instructions=(
                "Say immediately in one clear, warm sentence: "
                "'Good day, sir. Good day, ma. How may I help you?'"
            )
        )

    async def on_enter(self) -> None:
        await self.greet_once()

    async def _publish_action(self, payload: dict) -> None:
        encoded = json.dumps(payload).encode("utf-8")
        await self._room.local_participant.publish_data(
            encoded,
            reliable=True,
            topic="app-action",
        )

    @function_tool()
    async def escalate_to_management(
        self,
        context: RunContext,
        location: str,
        emergency_reason: str,
        client_name: str = "",
        phone_or_whatsapp: str = "",
    ) -> str:
        """Immediately escalate an emergency call or urgent lift fault to duty management and open WhatsApp."""
        try:
            await log_lead_and_booking(
                client_name=client_name or "Emergency Caller",
                location=location,
                lift_type="Emergency Escalation",
                inquiry=f"URGENT EMERGENCY: {emergency_reason} | Contact: {phone_or_whatsapp or 'Not provided'}",
                service_type="24/7 Emergency Dispatch",
                scheduled_date=None,
            )
        except Exception as e:
            print(f"[EMERGENCY DB ERROR] {e}")

        await self._publish_action(
            {
                "action": "escalate_management",
                "urgent": True,
                "client_name": client_name or "Emergency Caller",
                "phone_or_whatsapp": phone_or_whatsapp,
                "location": location,
                "lift_type": "Emergency Escalation",
                "inquiry": emergency_reason,
            }
        )
        return "Emergency escalated to duty management. Reassure the caller in one short sentence."

    @function_tool()
    async def check_and_book_slot(
        self,
        context: RunContext,
        client_name: str,
        location: str,
        lift_type: str,
        service_type: str,
        inquiry: str,
        scheduled_date: str = "",
        company: str = "",
        project_name: str = "",
        email: str = "",
        phone_or_whatsapp: str = "",
        project_type: str = "",
        quantity: int = 1,
        floors_and_stops: str = "",
        load: str = "",
        speed: str = "",
        power_standard: str = "",
        delivery_terms: str = "",
        project_stage: str = "",
        target_delivery: str = "",
    ) -> str:
        """Save client to CRM, allocate staff/equipment, and sync quote fields to the call screen."""
        try:
            result = await log_lead_and_booking(
                client_name=client_name,
                location=location,
                lift_type=lift_type,
                inquiry=inquiry,
                service_type=service_type,
                scheduled_date=scheduled_date or None,
            )
            crm_note = f"Logged lead #{result['lead_id']} ({result['assigned_staff']})."
        except Exception as e:
            print(f"[DB ERROR] {e}")
            crm_note = "Details noted for our engineering desk."

        await self._publish_action(
            {
                "action": "quote_collected",
                "client_name": client_name,
                "company": company,
                "location": location,
                "project_name": project_name,
                "email": email,
                "phone_or_whatsapp": phone_or_whatsapp,
                "project_type": project_type or service_type,
                "lift_type": lift_type,
                "quantity": quantity,
                "floors_and_stops": floors_and_stops,
                "load": load,
                "speed": speed,
                "power_standard": power_standard,
                "delivery_terms": delivery_terms,
                "project_stage": project_stage,
                "target_delivery": target_delivery or scheduled_date,
                "inquiry": inquiry,
            }
        )
        return f"{crm_note} Give a clear, brief quote summary."

    @function_tool()
    async def trigger_whatsapp_redirect(
        self,
        context: RunContext,
        client_name: str,
        location: str,
        lift_type: str,
        client_inquiry: str,
        company: str = "",
        project_name: str = "",
        email: str = "",
        phone_or_whatsapp: str = "",
        project_type: str = "",
        quantity: int = 1,
        floors_and_stops: str = "",
        load: str = "",
        speed: str = "",
        power_standard: str = "",
        delivery_terms: str = "",
        project_stage: str = "",
        target_delivery: str = "",
        urgent: bool = False,
    ) -> str:
        """Open a pre-filled WhatsApp chat on the caller's device with their quote summary."""
        await self._publish_action(
            {
                "action": "redirect_whatsapp",
                "urgent": urgent,
                "client_name": client_name,
                "company": company,
                "location": location,
                "project_name": project_name,
                "email": email,
                "phone_or_whatsapp": phone_or_whatsapp,
                "project_type": project_type,
                "lift_type": lift_type,
                "quantity": quantity,
                "floors_and_stops": floors_and_stops,
                "load": load,
                "speed": speed,
                "power_standard": power_standard,
                "delivery_terms": delivery_terms,
                "project_stage": project_stage,
                "target_delivery": target_delivery,
                "inquiry": client_inquiry,
            }
        )
        return "WhatsApp summary sent to screen. Ask caller to tap Send."


async def entrypoint(ctx: JobContext) -> None:
    openai_api_key = ctx.proc.userdata.get("openai_api_key") or os.getenv("OPENAI_API_KEY")
    if not openai_api_key:
        raise RuntimeError(f"OPENAI_API_KEY not found in environment or {ENV_FILE}")

    realtime_model = openai.realtime.RealtimeModel(
        model=os.getenv("OPENAI_REALTIME_MODEL", "gpt-realtime"),
        voice=os.getenv("OPENAI_REALTIME_VOICE", "marin"),
        api_key=openai_api_key,
    )

    try:
        realtime_model.update_options(
            turn_detection={
                "type": "server_vad",
                "threshold": 0.72,
                "prefix_padding_ms": 200,
                "silence_duration_ms": 600,
                "create_response": True,
                "interrupt_response": False,
            }
        )
    except Exception:
        pass

    agent = ElevatorXAgent(ctx.room)
    session = AgentSession(llm=realtime_model)

    await ctx.connect()
    await session.start(room=ctx.room, agent=agent)


if __name__ == "__main__":
    cli.run_app(
        WorkerOptions(
            entrypoint_fnc=entrypoint,
            num_idle_processes=0,
            initialize_process_timeout=60.0,
        )
    )