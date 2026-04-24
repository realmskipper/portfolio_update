# williamplant.net

Personal portfolio and project hub for William Plant, built with Next.js and deployed on Vercel.

## Consolidation

This single app replaces five separate deployments that used to power the old site:

| Before | After |
| --- | --- |
| Django app on AWS Lightsail (main site) | Next.js pages on Vercel |
| Streamlit dashboard on EC2 (Docker) — "Live From the Blockchain" | React route at `/blockchain` + `/api/blockchain` serverless route |
| Chatbot on Azure — "Chat Assistant" | `/chat` route + `/api/chat` serverless route (Anthropic API) |
| `wtplant.github.io/truisms` — React app on GitHub Pages | Linked as an external project card |
| Python automation scripts on an Ubuntu EC2 instance | Documented as an external project card |

Hosting cost went from ~$30/month across Lightsail, EC2, and Azure to $0 on Vercel's hobby tier. Everything ships from one repo, one deploy pipeline, and one domain.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19, Tailwind CSS 4
- **Language:** TypeScript (strict mode)
- **Content:** Markdown blog posts under `content/blog/`, parsed with `gray-matter` + `marked`
- **AI:** `@anthropic-ai/sdk` for the `/chat` assistant
- **Hosting:** Vercel

## Routes

| Path | Purpose |
| --- | --- |
| `/` | Project cards |
| `/about` | Bio + embedded resume PDF |
| `/blog` | Markdown blog index |
| `/blog/[slug]` | Individual post |
| `/chat` | Streaming chat assistant |
| `/blockchain` | Live Ethereum + market data |
| `/contact` | Email, GitHub, LinkedIn |
| `/api/chat` | Chat proxy → Anthropic API |
| `/api/blockchain` | Ethereum JSON-RPC + CoinMarketCap proxy |

## Local development

Requires Node 20+ (tested on 25).

```sh
npm install
cp .env.local.example .env.local   # if present; otherwise create one
npm run dev
```

Then open http://localhost:3000.

### Environment variables

| Name | Used by | Required for |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | `/api/chat` | Chat feature in prod + dev |

The rest of the site (home, about, blog, blockchain, contact) works without any env vars.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build (runs full TypeScript check) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint |

Always run `npm run build` before pushing — `next dev` doesn't enforce strict TypeScript, but `next build` (and therefore Vercel) does.

## Deployment

Pushes to `main` auto-deploy on Vercel. Preview deployments are created for every branch and PR.
