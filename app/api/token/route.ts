import { NextResponse } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';

export const runtime = 'nodejs';
export async function POST(request: Request) {
  try {
    const { roomName, participantName } = await request.json();
    if (typeof roomName !== 'string' || !/^[a-zA-Z0-9_-]{3,100}$/.test(roomName)) {
      return NextResponse.json({ error: 'Invalid meeting room code.' }, { status: 400 });
    }
    if (typeof participantName !== 'string' || !participantName.trim() || participantName.length > 60) {
      return NextResponse.json({ error: 'Enter a name of 1–60 characters.' }, { status: 400 });
    }
    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;
    const url = process.env.NEXT_PUBLIC_LIVEKIT_URL;
    if (!apiKey || !apiSecret || !url) {
      return NextResponse.json({ error: 'Video calling is not configured yet. The site owner must add LIVEKIT_API_KEY, LIVEKIT_API_SECRET, and NEXT_PUBLIC_LIVEKIT_URL in Vercel environment variables.' }, { status: 503 });
    }
    const identity = `${participantName.trim().replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 35)}_${crypto.randomUUID().slice(0, 8)}`;
    const token = new AccessToken(apiKey, apiSecret, { identity, name: participantName.trim(), ttl: '6h' });
    token.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true, canPublishData: true });
    return NextResponse.json({ token: await token.toJwt(), url });
  } catch {
    return NextResponse.json({ error: 'Unable to prepare the meeting. Please try again.' }, { status: 500 });
  }
}
