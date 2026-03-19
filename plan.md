# Portfolio Revamp — PLAN.md

## Overview

Consolidate williamplant.net from multiple separate deployments (Django on Lightsail, Streamlit on EC2, chatbot on Azure) into a single modern Next.js application deployed on Vercel. The site should tell the story: "I unified five separate services into one modern stack."

## Current Site Reference

- **Live site**: http://williamplant.net/
- **About page**: http://williamplant.net/about/
- **Contact page**: http://williamplant.net/contact/
- Use the same project descriptions and copy from the current site as a starting point
- Reuse existing project images — these will be provided in the `/public/images/` directory

## Inspiration

- **Primary reference**: [Brittany Chiang v4](https://v4.brittanychiang.com/) — dark palette, clean hierarchy, scrolling project cards
- **Key differences from Brittany Chiang**: No teal. No sticky sidebar — use a top navigation bar instead. Silver/ice-blue text hierarchy with electric blue (#3b82f6) accent color for interactive elements only. GitHub + LinkedIn as icon logos in the top nav (like Brittany's social icons).

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (where useful)
- **Deployment**: Vercel (free tier)
- **Domain**: Point williamplant.net DNS to Vercel

## Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Background | Midnight navy | `#0a1628` |
| Surface / cards | Dark slate | `#1e293b` |
| Headings | Light silver | `#e2e8f0` |
| Subheadings | Cool silver | `#cbd5e1` |
| Body text | Muted silver | `#94a3b8` |
| Muted / labels | Slate gray | `#64748b` |
| Accent (links, CTAs, hover, tags) | Electric blue | `#3b82f6` |
| Tag backgrounds | Deep navy | `#0f2440` |

These map cleanly to Tailwind's slate and blue scales. Define as CSS variables in `tailwind.config.ts` for easy swapping later.

## Layout & Structure

Single-page scrolling layout inspired by Brittany Chiang v4:

### Top Navigation Bar (sticky)
- **Left side**: Name — **William Plant** (links to home)
- **Center/Right**: Nav links — Home/Projects, About, Contact, Blog
- **Far right**: GitHub icon + LinkedIn icon (logos, no text — just the icons linking out, like Brittany Chiang's social links)
- Resume link lives somewhere in the nav or on the About page

### Pages

**Home/Projects** (`/`) — The main landing page. Brittany Chiang-style scrolling layout. This is where visitors land and scroll through your projects. Content:

- Brief intro at the top with the consolidation narrative: "This site itself is a project — I migrated a Django app on AWS Lightsail, a Streamlit app on EC2, and a chatbot on Azure into this single Next.js application on Vercel."
- Project cards scroll below. Each card has: title, description, tech tags, and a link.

   | Project | Description | Tags | Link |
   |---------|-------------|------|------|
   | This Website | Consolidated 5 deployments into one Next.js app on Vercel. Previously Django/Lightsail + Streamlit/EC2 + Azure. | Next.js, React, Tailwind, Vercel | — |
   | Chat Assistant | AI assistant built with the OpenAI API. Now runs as a serverless API route within this site. | OpenAI API, Next.js API Routes | `/chat` (internal route) |
   | Live From the Blockchain | Real-time Ethereum data via JSON RPC API + CoinMarketCap. Migrated from Streamlit/Docker on EC2. | React, Ethereum JSON RPC, CoinMarketCap API | `/blockchain` (internal route) |
   | Truisms App | React app returning axioms from Jenny Holzer's Truisms. Deployed on GitHub Pages. | React, GitHub Pages | External link (keep as-is) |
   | Automation with Python | Bot that posts content to WordPress daily, deployed on Ubuntu/AWS. | Python, AWS, WordPress | Medium blog post link |
   | Edible Dialect (archived) | Aggregate food review site. Link to Wayback Machine archive. | HTML, CSS, WordPress | Wayback Machine link |

**About** (`/about`) — Separate page. Background, experience, skills. Keep it concise.

**Contact** (`/contact`) — Separate page. Email, GitHub, LinkedIn.

**Blog** — External link to https://wtplant.medium.com/ (same as current site).

### Mobile
- Nav collapses to hamburger menu or condensed bar
- Cards stack full-width

## Interactive Apps (Internal Routes)

These are the key differentiator — the apps that used to live on separate servers now live as routes within the same Next.js app.

### `/chat` — Chat Assistant
- React-based chat UI (not Streamlit)
- Next.js API route (`/api/chat`) proxies requests to OpenAI API
- OpenAI API key stored as Vercel environment variable
- Simple message history, streaming responses
- Clean UI matching the site's design system

### `/blockchain` — Live From the Blockchain
- React-based dashboard (not Streamlit)
- Next.js API route (`/api/blockchain`) fetches data from:
  - Ethereum JSON RPC API (block height, pending transactions, gas prices)
  - CoinMarketCap API (price data for top chains)
- Auto-refresh or manual refresh button
- Card-based data display matching the site's design system
- API keys stored as Vercel environment variables

## Migration Plan

### Phase 1: Scaffold & Deploy
1. `npx create-next-app@latest williamplant-site --typescript --tailwind --app`
2. Set up Tailwind config with custom color palette
3. Build the single-page portfolio layout (sidebar + scrolling content)
4. Deploy to Vercel, verify it works
5. Do NOT point DNS yet — test on Vercel preview URL

### Phase 2: Integrate Apps
6. Build `/chat` route with OpenAI API integration
7. Build `/blockchain` route with ETH RPC + CoinMarketCap integration
8. Add API routes (`/api/chat`, `/api/blockchain`)
9. Set environment variables in Vercel dashboard
10. Test both apps on preview URL

### Phase 3: Go Live
11. Point williamplant.net DNS to Vercel
12. Verify SSL and routing
13. Shut down: Lightsail instance, EC2 instance, Azure deployment
14. Celebrate the cost savings

## Cost Impact

| Service | Before | After |
|---------|--------|-------|
| AWS Lightsail (Django) | ~$5-10/mo | $0 |
| AWS EC2 (Streamlit/Docker) | ~$10-15/mo | $0 |
| Azure (Chatbot) | ~$5-10/mo | $0 |
| Vercel (Next.js) | — | $0 (free tier) |
| **Total** | **~$20-35/mo** | **$0/mo** |

Note: Vercel free tier is very generous for personal sites. If traffic grows, Pro is $20/mo which is still cheaper than running three separate services.

## Design Notes

- **Font**: Use a clean sans-serif. Geist (Vercel's font, ships with create-next-app) is a solid default that fits the aesthetic. Or consider JetBrains Mono for a dev-aesthetic monospace touch on code/tech elements.
- **Animations**: Subtle only. Fade-in on scroll for project cards. Smooth scroll between sections. No heavy animations.
- **Active nav highlighting**: Highlight current page in the top nav with the accent color.
- **Hover states**: Project cards get a subtle border glow or background shift on hover. Links transition to a slightly brighter blue.
- **Tags**: Electric blue text (#3b82f6) on deep navy background (#0f2440) — small, pill-shaped.
- **The consolidation narrative is a feature, not just copy**: Consider a small "architecture" note on each project card showing what it was before → what it is now. e.g., "Previously: Streamlit + Docker on EC2 → Now: React route on Vercel"

## Assets to Reuse

Migrate these from the current Django site:
- Project screenshots/images from `/static/images/`
- Any blog post links (keep pointing to Medium)
- Favicon / meta images (or redesign)

## Out of Scope (for now)

- Blog (keep linking to Medium)
- Truisms app migration (keep on GitHub Pages, just link to it)
- CMS or admin panel (static content is fine)
- Analytics (can add Vercel Analytics later, it's free)