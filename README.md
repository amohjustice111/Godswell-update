# Godswell Updates

A responsive Next.js progressive web app for creating and joining live video meetings. Video is powered by LiveKit; room tokens are created server-side and API secrets are never sent to the browser.

## Important: enable real video calling

The website UI and meeting flow are implemented, but live calls require LiveKit credentials.

1. Create a project at https://cloud.livekit.io/ (check current plan and usage limits).
2. In the LiveKit project, copy the WebSocket URL, API key, and API secret.
3. In your Vercel project, open **Settings → Environment Variables** and add:
   - `NEXT_PUBLIC_LIVEKIT_URL` = your LiveKit WebSocket URL (starts with `wss://`)
   - `LIVEKIT_API_KEY` = your API key
   - `LIVEKIT_API_SECRET` = your API secret
4. Apply them to Production (and Preview if needed), save, then redeploy.
5. Never put `LIVEKIT_API_SECRET` in a variable starting with `NEXT_PUBLIC_`, and never commit real secrets to GitHub.

Without those values, the site will display a helpful configuration message instead of pretending a call is connected.

## Run locally

You need Node.js 20 or newer and npm.

```bash
npm install
cp .env.example .env.local
# Edit .env.local and add your LiveKit credentials
npm run dev
```

Open http://localhost:3000.

## Deploy as a new project on Vercel

1. Create a **new** GitHub repository named `godswell-updates`.
2. Upload the contents of this folder to that new repository (not to an existing project repository).
3. In Vercel choose **Add New → Project**, import the new repository, and deploy.
4. Add the three LiveKit environment variables in Vercel, then redeploy.
5. Test with two devices and two different participants.

## Features

- Unique room IDs generated in the browser using `crypto.randomUUID()`.
- Copyable meeting URLs and WhatsApp invitations.
- LiveKit camera, microphone, participant tiles, mute/camera controls and conference UI.
- Recent room shortcuts and remembered display name on the same browser.
- Responsive mobile/desktop layout and PWA manifest/install guidance.

## Notes

- Use HTTPS in production for camera and microphone access. Vercel provides HTTPS.
- The browser asks each participant for camera/microphone permission.
- Meeting IDs are shareable, not secret. Anyone with the link can attempt to join; add authentication or moderator controls before using for sensitive meetings.
- PWA installation availability differs by browser. The install button uses the browser's install prompt where supported and otherwise explains manual installation.
- A service worker/offline caching is not included: live video requires internet access.
