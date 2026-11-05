# NOVA AI Starter

A minimal mobile-friendly Node.js chat app.

## Run locally
1. Install Node.js 18 or newer.
2. Run `npm install`
3. Run `npm start`
4. Open `http://localhost:3000`

## Deploy
Deploy this repository as a Node web service. Build command: `npm install`. Start command: `npm start`.

## Optional AI connection
Set these environment variables in your hosting provider:
- `AI_API_URL`: full chat-completions endpoint from your chosen AI provider
- `AI_API_KEY`: private API key (never put it in browser code or GitHub)
- `AI_MODEL`: model identifier supported by that provider

This starter does not persist server-side chat history. Add a properly secured database and user authentication before storing long-term memories.
