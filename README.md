# Core Boys Landing

[![Security checks](https://github.com/MDCran/coreboys-landing/actions/workflows/security-checks.yml/badge.svg)](https://github.com/MDCran/coreboys-landing/actions/workflows/security-checks.yml)
[![CodeQL](https://github.com/MDCran/coreboys-landing/actions/workflows/codeql.yml/badge.svg)](https://github.com/MDCran/coreboys-landing/actions/workflows/codeql.yml)

A historical, unofficial fan-site implementation for The Core Boys, built by [MDCran](https://mdcran.com/). It brings a creator roster, social links, member galleries, and Twitch live-status indicators into a responsive static site.

This repository is retained for historical reference. Its content and external services may change independently of the source.

## Engineering highlights

- Next.js App Router with pre-generated member pages and static export
- Three.js scenes through React Three Fiber and Drei
- Motion animations, a mouse-responsive group photo, and reusable UI components
- Page metadata, JSON-LD, generated sitemap, and robots configuration
- Client-side Twitch status lookup that works without an application server

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4, Three.js, React Three Fiber, Drei, and Motion. See [package.json](package.json) for versions.

## Run locally

Use Node.js and npm compatible with the committed lockfile. The dependency-check workflow uses Node.js 20.

```bash
git clone https://github.com/MDCran/coreboys-landing.git
cd coreboys-landing
npm ci
npm run dev
```

Open the URL printed by Next.js, normally [http://localhost:3000](http://localhost:3000).

To create the static site:

```bash
npm run build
```

[next.config.ts](next.config.ts) sets `output: "export"`, producing files in `out/` for a static host. The manifest's `start` script invokes `next start`, which is not the serving path for this static-export configuration.

## Configuration

Set the optional `NEXT_PUBLIC_SITE_URL` in a git-ignored `.env.local` before building to control canonical URLs, sitemap entries, and Open Graph URLs. It defaults to `https://thecoreboys.com`.

The site includes Google Analytics through [src/components/Analytics.tsx](src/components/Analytics.tsx), with the measurement ID defined in [src/lib/site.ts](src/lib/site.ts). Review analytics and third-party assets before reusing or deploying the project.

## Source and routes

- [src/app/page.tsx](src/app/page.tsx): home page, roster, and house-tour section
- [src/app/[member]/page.tsx](src/app/%5Bmember%5D/page.tsx): generated member profiles and galleries
- [src/components](src/components): scenes, animation, social controls, and status indicators
- [src/lib/data.ts](src/lib/data.ts): creator and social-link data
- [src/lib/twitchLive.ts](src/lib/twitchLive.ts): browser-side Twitch status helper
- [public](public): local images and `embed-preview.png`
- Legal pages: `/terms`, `/privacy`, and `/cookies`
- Generated metadata: `/sitemap.xml` and `/robots.txt`

Twitch status is fetched directly from the public decapi.me uptime endpoint in the browser, with a short in-memory cache. Failed lookups are treated as offline. There is no `/api/live` route in this snapshot.

## Quality and security checks

- [CodeQL](.github/workflows/codeql.yml) analyzes JavaScript and TypeScript on pushes, pull requests, and a weekly schedule.
- [Security checks](.github/workflows/security-checks.yml) installs locked dependencies with lifecycle scripts disabled, runs `npm audit --audit-level=high`, and checks whitespace with `git diff --check`.
- The audit step is **non-blocking** (`continue-on-error: true`). A successful workflow may still contain dependency advisories.
- No automated test or lint script is defined in the current package manifest. Run the build and review the relevant workflow logs when evaluating a change.

## Attribution

Built by [MDCran](https://github.com/MDCran) as an unofficial fan project. Creator names, branding, photos, and other third-party media remain attributable to their respective owners.
