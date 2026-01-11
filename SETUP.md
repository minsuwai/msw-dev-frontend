# my-portfolio — Setup and deployment notes

This repository contains the Next.js frontend for the portfolio. It fetches content from the Strapi backend.

## Quick start

Install dependencies and run locally:

```bash
npm install
npm run dev
# or yarn dev
```

Build and preview production:

```bash
npm run build
npm run start
```

## Environment variables

Use a `.env.local` for local development and DO NOT commit it. Add a `.env.example` documenting variables.

Common variables used by this project:

- `NEXT_PUBLIC_STRAPI_URL` — the public Strapi API base URL (e.g. `http://localhost:1337`).
- `STRAPI_API_TOKEN` — (optional) server-only token if your Next.js server code needs to call protected Strapi endpoints. Keep this secret in host/CI and do not expose it to the browser.

Example `.env.local` entries (do not commit):

```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
# STRAPI_API_TOKEN=your_api_token_here
```

## Deploy

- Vercel is the simplest host for Next.js apps. Add env vars in the Vercel dashboard.
- When using server-side code that calls Strapi with a token, set the token in Vercel as a non-public secret (no `NEXT_PUBLIC_` prefix).

---

If you'd like, I can create a `.env.example` and add a short `README.md` section describing these variables.
