# Clean King Detailing

Marketing and booking site for [Clean King Detailing](https://www.cleankingdetail.com), a car detailing shop in Blissfield, MI. Built with Next.js (App Router) and deployed on Vercel.

## Getting started

Requires **Node 20** (`next build` is known to break on Node 23).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). `npm run dev` uses webpack on purpose — the turbopack dev runtime breaks older Safari (use `npm run dev:turbo` only if that doesn't matter to you).

## Environment variables

The booking and contact forms email leads via [Resend](https://resend.com). Without these set, form submissions return a 500.

| Variable             | Purpose                                                         |
| -------------------- | --------------------------------------------------------------- |
| `RESEND_API_KEY`     | Resend API key                                                  |
| `RESEND_FROM`        | Verified sender address (e.g. `Clean King <hello@domain.com>`)  |
| `OWNER_ALERT_EMAILS` | Comma-separated list of shop owner addresses that receive leads |
| `RESEND_AUDIENCE_ID` | Optional — Resend audience for promo opt-ins                    |

## Project layout

```
src/
  app/                 Routes (App Router) + garage.css design system
    api/book           Booking form endpoint → owner alert + customer confirmation
    api/contact        Contact form endpoint → owner alert
  components/
    forms/             Shared form pieces (honeypot)
    garage/            Design-system components (icons, reviews carousel)
    layout/            Header, footer, top strip
  data/                Site content: contact info, packages, FAQs
  services/            Email (Resend) + spam heuristics
```

Design notes: the site is dark-only by choice. Styling lives in `src/app/garage.css` (a scoped, hand-written design system) rather than Tailwind utilities; Tailwind is loaded mainly for preflight and the odd utility class.

## Scripts

- `npm run dev` — dev server (webpack)
- `npm run build` / `npm run start` — production build & serve
- `npm run lint` / `npm run lint:fix` — ESLint
- `npm run format` / `npm run format:check` — Prettier
