# Claude Code Instructions

## Knowledge Base
Path: ~/second-brain/wiki
At session start:
1. Read wiki/hot.md
2. Read wiki/index.md  
3. Pull relevant domain pages before asking me for context
My decisions, patterns, bugs solved, and preferences are there.

## Project
Custom Next.js frontend for karteekn.com — a personal brand & technical blog by Karteek (ServiceNow Architect, 14+ years experience). Ghost CMS powers the content via headless API.

## Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **CMS**: Ghost (headless, Content API)
- **Deploy**: Vercel
- **Images**: Nano Banana 2 (Google Gemini) — generated assets live in `/public/images/`
- **Language**: TypeScript

## Project Structure
```
/app              → App Router pages
/components       → Reusable UI components
/lib              → Ghost API client, utils, types
/public/images    → Nano Banana generated assets
/styles           → Global CSS + Tailwind config
```

## Key Rules
1. **Ghost API only** — never hardcode blog content; always fetch via `lib/ghost.ts`
2. **No inline styles** — Tailwind classes only
3. **Dark mode first** — use `dark:` variants; default theme is dark
4. **Mobile first** — all components start at mobile breakpoint
5. **No `any` types** — define proper TypeScript interfaces in `lib/types.ts`
6. **Images via `next/image`** — always, no raw `<img>` tags
7. **Environment variables** in `.env.local` — never hardcode keys

## Environment Variables
```
GHOST_URL=https://www.karteekn.com
GHOST_CONTENT_API_KEY=<from Ghost Admin → Integrations>
```

## Ghost API Endpoints Used
- Posts list: `GET /ghost/api/content/posts/`
- Single post: `GET /ghost/api/content/posts/slug/{slug}/`
- Tags: `GET /ghost/api/content/tags/`
- Author: `GET /ghost/api/content/authors/`

## Naming Conventions
- Components: `PascalCase` (e.g. `ArticleCard.tsx`)
- Utilities: `camelCase` (e.g. `formatDate.ts`)
- Pages: `kebab-case` folders (e.g. `app/about/page.tsx`)
- CSS classes: Tailwind only, no custom class names unless absolutely necessary

## Performance
- Use `generateStaticParams` for post slugs (SSG)
- Use `revalidate = 3600` for ISR on post pages
- Lazy load images below the fold
