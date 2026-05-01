# coreboys-landing

Temporary maintenance lander for **CORE — Create Own Run Everything**, the
content collective home of Marlon, Lacy, Silky, Adapt, Ron and Jason.

The flagship CORE site is being rebuilt; this lander surfaces every official
group and member channel in one place while it's down.

## Stack

- **Next.js 16** (App Router, Turbopack, statically prerendered)
- **React 19**
- **Tailwind v4** (`@theme inline` + custom CSS)
- **Three.js** via `@react-three/fiber` (broadcast wireframe orb, group-photo
  plane with mouse-driven 3D tilt)
- **motion** for entrance and ambient animations
- **next/og** for dynamically generated favicons
- Google Analytics (`G-BG4VPN3LGG`) via `next/script`

## Getting started

```bash
npm install
npm run dev
```

Then open the printed URL (usually http://localhost:3000).

```bash
npm run build   # production build, all routes prerender to static HTML
npm run start   # serve the built output
```

## Configuration

Optional environment variables go in `.env.local`:

- `NEXT_PUBLIC_SITE_URL` — public origin used for canonical URLs, sitemap, and
  Open Graph image paths. Defaults to `https://thecoreboys.com`.

## Routes

| Route                | Purpose                                              |
| -------------------- | ---------------------------------------------------- |
| `/`                  | Hero, $20M house tour video, roster grid             |
| `/[member]`          | SEO-optimized member page with Twitch live status, gallery, fact sheet |
| `/embedded-preview`  | 1200×630 static card for Twitter / Discord screenshots |
| `/terms`             | Terms of Service                                     |
| `/privacy`           | Privacy Policy                                       |
| `/cookies`           | Cookie Policy                                        |
| `/sitemap.xml`       | Generated sitemap                                    |
| `/robots.txt`        | Generated robots                                     |
| `/api/live`          | JSON live-status across all members (ISR 60s)        |

## Live status

`/api/live` polls the public **decapi.me** Twitch uptime endpoint for each
member's Twitch handle. Status is cached server-side (60s ISR) and refreshed
client-side every 60 seconds in the navbar dropdown, member-page button, and
member-card badge.

## Contact

Built by [MDCran](https://mdcran.com) — unofficial fan project.
