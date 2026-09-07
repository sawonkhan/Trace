# Trace Visitor — Vercel single-page project

A permission-based visitor diagnostics page. It collects browser/device/network-related values that a normal webpage can expose, and asks the visitor before collecting precise GPS coordinates.

## Included

- Public IP (server-side request header)
- GPS latitude/longitude/accuracy after browser permission
- Browser user-agent and User-Agent Client Hints when available
- OS/platform hints
- Screen and viewport size
- Pixel ratio
- Language/timezone
- Touch capability
- Logical CPU count
- Approximate device memory when exposed
- Connection information when exposed
- Battery level/charging state where the browser supports the API
- Referrer/page/visit timestamp

It does **not** request or attempt to obtain IMEI, MAC address, SIM number, phone number, contacts, SMS, camera, or microphone.

## Deploy on Vercel

### Option A — GitHub

1. Create a new GitHub repository.
2. Upload the contents of this folder.
3. Open Vercel and choose **Add New → Project**.
4. Import the GitHub repository.
5. Keep the default settings and deploy.
6. Open the generated `*.vercel.app` URL.

### Option B — Vercel CLI

Install Node.js, then run:

```bash
npm install -g vercel
vercel login
cd trace-visitor-vercel
vercel
```

For production:

```bash
vercel --prod
```

## Important: what the included API does

`/api/collect` receives the collected JSON and the request IP, then returns a small confirmation. It does **not** create permanent visitor storage.

This is intentional: storing precise GPS/IP data requires you to choose a database, retention policy, access control, and privacy notice appropriate to your use case.

## Adding permanent storage

For a real admin dashboard, connect `/api/collect` to a database such as Supabase/Postgres/another hosted database.

Recommended fields:

- received_at
- ip
- gps_latitude
- gps_longitude
- gps_accuracy
- user_agent
- platform
- browser_brands
- language
- timezone
- screen
- viewport
- pixel_ratio
- cpu_cores
- device_memory
- connection_type
- battery
- charging
- referrer
- page_url

Use authentication for any dashboard and avoid retaining precise location longer than necessary.

## Local test

```bash
npm install
npm run dev
```

Then open the local Vercel development URL shown in the terminal.

## Privacy

Before deploying for real visitors, add a clear privacy notice explaining what information is collected, why, retention, and how visitors can exercise applicable rights. Precise GPS should remain opt-in.
