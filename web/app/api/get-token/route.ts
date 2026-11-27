import { NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";

export async function GET() {
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "LiveKit credentials missing in environment variables" },
      { status: 500 }
    );
  }

  const roomName = `elevatorx-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const participantName = `client-${Math.floor(Math.random() * 10000)}`;

  const at = new AccessToken(apiKey, apiSecret, {
    identity: participantName,
    ttl: "1h",
  });

  at.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
  });

  const token = await at.toJwt();
  return NextResponse.json(
    { token, roomName, issuedAt: Date.now() },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}