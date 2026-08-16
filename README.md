# Clean King Detailing

Marketing and booking site for [Clean King Detailing](https://www.cleankingdetail.com), a car detailing shop in Blissfield, MI. Built with Next.js (App Router) and deployed on Vercel.

## Getting started

Requires **Node 24** (see `.nvmrc`; `nvm use` picks it up).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). `npm run dev` uses webpack on purpose — the turbopack dev runtime breaks older Safari (use `npm run dev:turbo` only if that doesn't matter to you).

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values. The booking and contact forms email leads via [Resend](https://resend.com); without the first three set, form submissions return a 500.

| Variable                             | Purpose                                                                                        |
| ------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`                     | Resend API key                                                                                 |
| `RESEND_FROM`                        | Verified sender address (e.g. `Clean King <hello@domain.com>`)                                 |
| `OWNER_ALERT_EMAILS`                 | Comma-separated list of shop owner addresses that receive leads                                |
| `RESEND_SEGMENT_ID`                  | Optional — Resend segment that collects promo opt-ins                                          |
| `NEXT_PUBLIC_GOOGLE_MAPS_STATIC_KEY` | Optional — Google Static Maps key for the map thumbnail (public; restrict it by HTTP referrer) |

## Project layout

```
src/
  app/                 Routes (App Router) + globals.css (Tailwind theme)
    api/book           Booking form endpoint → owner alert + customer confirmation
    api/contact        Contact form endpoint → owner alert
    sitemap.js         Generated from data/nav.js
  components/
    forms/             Shared form pieces (honeypot)
    garage/            Page-specific pieces (icons, reviews carousel, map, gallery)
    layout/            Header, footer, top strip, mobile CTA bar
    location/          Shared template for the city landing pages
    seo/               JSON-LD script helper
    ui/                Reusable Tailwind building blocks (Button, Eyebrow, cards…)
  data/                Site content: business facts + SITE_URL, packages, nav, FAQs
  lib/                 Framework-free helpers shared by client and server (validation)
  services/            Server-only: email (Resend), form-endpoint plumbing, spam heuristics
```

Design notes: the site is dark-only by choice. Styling is Tailwind v4 utilities in JSX. Design tokens (palette, fonts, fluid display type sizes, `px-page` / `py-section` rhythm, motion) live in the `@theme` block of `src/app/globals.css`, alongside a few `@utility` helpers (`bg-grid`, `filter-map`, `bg-stripes`, `backdrop-frost`, `pb-safe-*`) for things utilities can't express. Repeated patterns are React components in `src/components/ui/` (Button, Eyebrow, SectionHead, PageHero, CtaBand, package/feature cards, LocationSection). Prettier sorts class names via `prettier-plugin-tailwindcss`.

Business facts (phone, address, hours, prices, packages) live in `src/data/site.js` and flow into the pages, the emails and the JSON-LD — change them there only.

## Forms & spam

Both forms POST JSON to their API route. Every submission carries a hidden honeypot field and the time the form was open; the route silently accepts (and drops) anything that trips those checks (`src/services/spam.js`). Payloads are trimmed, length-capped and validated server-side (`src/lib/validation.js`); the booking route resolves the package and price from `data/site.js` rather than trusting the client.

## Scripts

- `npm run dev` — dev server (webpack)
- `npm run build` / `npm run start` — production build & serve
- `npm run lint` / `npm run lint:fix` — ESLint
- `npm run format` / `npm run format:check` — Prettier
