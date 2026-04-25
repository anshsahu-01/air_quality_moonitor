# Atmos Grid

Production-ready IoT-based urban air quality monitoring platform built with Next.js App Router, Tailwind CSS, Recharts, Leaflet, Framer Motion, and Firebase-ready real-time syncing.

## Features

- Real-time dashboard for PM2.5, CO, NO2, and AQI
- Multi-node monitoring for distributed ESP32 devices
- AQI badges with Green / Yellow / Red states
- Live trend charts and pollutant comparison charts
- Interactive map with AQI-colored markers
- Alerts banner and toast notifications
- Moving-average AQI prediction for the next hour
- Device control toggles for fan/purifier simulation
- SSE fallback for instant local updates without refresh
- Firebase real-time integration when environment variables are configured
- Skeleton loading states, empty states, responsive SaaS-style dark UI

## Tech Stack

- Next.js 16 App Router
- Tailwind CSS 4
- Framer Motion
- Recharts
- Leaflet + React Leaflet
- Firebase client + Firebase Admin
- shadcn-style UI primitives using Radix
- Zod validation
- Sonner toasts

## Project Structure

```text
src/
  app/
    api/
      air-quality/route.js
      demo/pulse/route.js
      nodes/[nodeId]/control/route.js
      stream/route.js
    globals.css
    layout.js
    loading.js
    page.js
  components/
    dashboard/
    ui/
  hooks/
    use-realtime-air-quality.js
  lib/
    server/data-service.js
    air-quality.js
    firebase-admin.js
    firebase-client.js
    formatters.js
    sample-data.js
    utils.js
    validation.js
public/
  dummy-air-quality-payloads.json
```

## Step-by-Step Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template:

```bash
cp .env.example .env.local
```

3. For local demo mode:

- You can leave Firebase variables empty.
- The app will boot with seeded dummy sensor nodes.
- Real-time updates still work through the built-in SSE stream and the demo pulse endpoint.

4. For Firebase production mode:

- Create a Firebase project.
- Enable Firestore Database.
- Add a Web App in Firebase and copy the public config into `NEXT_PUBLIC_*` variables.
- Create a service account and place its credentials in:
  - `FIREBASE_PROJECT_ID`
  - `FIREBASE_CLIENT_EMAIL`
  - `FIREBASE_PRIVATE_KEY`

5. Start development:

```bash
npm run dev
```

6. Open:

```text
http://localhost:3000
```

## Environment Variables Guide

All variables are optional for local seeded mode.

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

### Notes

- `NEXT_PUBLIC_*` variables power client-side Firebase realtime subscriptions.
- `FIREBASE_*` variables power secure server-side writes from Next.js route handlers.
- `FIREBASE_PRIVATE_KEY` must keep newline characters escaped in `.env.local`, for example:

```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nABC...\n-----END PRIVATE KEY-----\n"
```

## API Endpoints

### `POST /api/air-quality`

Receives telemetry from ESP32 nodes.

Example payload:

```json
{
  "nodeId": "Node1",
  "location": "College Gate",
  "latitude": 28.6129,
  "longitude": 77.2295,
  "pm25": 110,
  "co": 9,
  "no2": 25
}
```

### `GET /api/air-quality`

Returns the dashboard snapshot used by the UI.

### `PATCH /api/nodes/:nodeId/control`

Updates the purifier/fan state.

Payload:

```json
{
  "enabled": true
}
```

### `POST /api/demo/pulse`

Injects a randomized sample reading for local testing.

### `GET /api/stream`

Server-Sent Events fallback stream used when Firebase is not configured.

## How ESP32 Connects to the API

1. Connect the ESP32 to Wi-Fi.
2. Read your sensor values from PM2.5, CO, and NO2 sensors.
3. Send JSON using HTTP `POST` to:

```text
http://<your-server-ip>:3000/api/air-quality
```

4. Use `Content-Type: application/json`.
5. Include `nodeId`, `location`, sensor values, and optionally latitude/longitude.

Example Arduino-style payload:

```cpp
String payload = R"({
  "nodeId":"Node1",
  "location":"College Gate",
  "latitude":28.6129,
  "longitude":77.2295,
  "pm25":110,
  "co":9,
  "no2":25
})";
```

## Dummy Data for Testing

- Seeded demo nodes load automatically on first run.
- Additional payload examples live in [public/dummy-air-quality-payloads.json](./public/dummy-air-quality-payloads.json).
- Use the dashboard's `Demo Pulse` button to simulate incoming telemetry.

## Production Notes

- Add authentication around the dashboard if public access is not desired.
- Replace the simulated purifier toggle with a real device-control callback or queue.
- Add Firebase security rules before deploying.
- Deploy easily on Vercel after setting the same environment variables.
