import { NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";

export async function GET() {
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "LiveKit credentials missing in web/.env.local" },
      { status: 500 }
    );
  }

  const roomName = `elevatorx-${Date.now()}`;
  const participantName = `client-${Math.floor(Math.random() * 10000)}`;

  const at = new AccessToken(apiKey, apiSecret, {
    identity: participantName,
    ttl: "15m",
  });

  at.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
  });

  const token = await at.toJwt();
  return NextResponse.json({ token, roomName });
}
