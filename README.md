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
  app/                 Routes (App Router) + globals.css (Tailwind theme)
    api/book           Booking form endpoint → owner alert + customer confirmation
    api/contact        Contact form endpoint → owner alert
  components/
    forms/             Shared form pieces (honeypot, date picker)
    garage/            Page-specific pieces (icons, reviews carousel, map)
    layout/            Header, footer, top strip, mobile CTA bar
    location/          Shared template for the city landing pages
    ui/                Reusable Tailwind building blocks (Button, Eyebrow, cards…)
  data/                Site content: contact info, packages, FAQs
  services/            Email (Resend) + spam heuristics
```

Design notes: the site is dark-only by choice. Styling is Tailwind v4 utilities in JSX. Design tokens (palette, fonts, fluid display type sizes, `px-page` / `py-section` rhythm, motion) live in the `@theme` block of `src/app/globals.css`, alongside a few `@utility` helpers (`bg-grid`, `filter-map`, `bg-stripes`, `backdrop-frost`, `pb-safe-*`) for things utilities can't express. Repeated patterns are React components in `src/components/ui/` (Button, Eyebrow, SectionHead, PageHero, CtaBand, package/feature cards, LocationSection). Prettier sorts class names via `prettier-plugin-tailwindcss`.

## Scripts

- `npm run dev` — dev server (webpack)
- `npm run build` / `npm run start` — production build & serve
- `npm run lint` / `npm run lint:fix` — ESLint
- `npm run format` / `npm run format:check` — Prettier
