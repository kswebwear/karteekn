# karteekn.com — Current Status

**Last updated:** 2026-04-20  
**Repo:** github.com/kswebwear/karteekn  
**Vercel project:** karteeks-projects-6c7acf0b/karteekn  
**Live preview:** karteekn-csricfqte-karteeks-projects-6c7acf0b.vercel.app  
**Production domain:** karteekn.com (not yet pointed to Vercel)

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS (dark-first, no inline styles) |
| CMS | Ghost headless at `karteek.ghost.io` |
| Fonts | Fraunces (serif headings) + IBM Plex Mono (body) |
| Deploy | Vercel (preview deployed, prod pending) |
| Images | `next/image` with remote pattern allowlist |

---

## Environment Variables

Set on Vercel (all 3 environments) and in `.env.local` (gitignored):

```
GHOST_URL=https://karteek.ghost.io
GHOST_CONTENT_API_KEY=954cd96b5600c298331c1e4045
NEXT_PUBLIC_SITE_URL=https://karteekn.com
```

`.env.example` is committed as a safe template.

---

## Pages Built

| Route | Type | Notes |
|---|---|---|
| `/` | SSG + ISR (300s) | Hero, featured post, article grid with tag filter, newsletter CTA |
| `/posts/[slug]` | SSG + ISR (3600s) | Full post with syntax highlighting, reading progress bar, author card, related posts |
| `/about` | ISR (3600s) | Timeline, skill badges, philosophy cards, CTA |
| `/tag/[slug]` | SSG + ISR | Filtered article grid per tag |
| `/api/subscribe` | Dynamic | Proxies to Ghost Members magic-link API |
| `/sitemap.xml` | Static | Auto-generated from all post slugs |
| `/robots.txt` | Static | Allows all, sitemap ref |

---

## Component Map

```
components/
  layout/
    Header.tsx       — sticky nav, mobile hamburger ('use client')
    Footer.tsx       — nav links, social icons (de-linked), copyright
    Layout.tsx       — Header + main + Footer wrapper
  home/
    Hero.tsx         — full-width text hero with CSS grid background
    FeaturedPost.tsx — latest post hero card
    ArticleGrid.tsx  — paginated grid with tag filter ('use client')
    TagFilter.tsx    — tag pill buttons
    NewsletterCTA.tsx — email subscribe form ('use client')
  post/
    PostHeader.tsx   — reading progress bar ('use client')
    PostBody.tsx     — Ghost HTML + highlight.js ('use client')
    AuthorCard.tsx   — author bio block
    RelatedPosts.tsx — related articles by tag
    BackToTop.tsx    — scroll-to-top button ('use client')
    CopyButton.tsx   — code block copy button
  about/
    Timeline.tsx     — career timeline
    SkillBadges.tsx  — skill tag grid
  shared/
    ArticleCard.tsx  — post card used in grids
    SafeImage.tsx    — next/image wrapper that hides on 404 ('use client')
    TagBadge.tsx     — amber pill, optionally links to /tag/[slug]
    ReadingTime.tsx  — "N min read" label
    ThemeToggle.tsx  — exists but REMOVED from UI (dark-only site)
```

---

## Key Decisions & Why

- **Raw fetch over @tryghost/content-api** — leverages Next.js built-in fetch cache for ISR
- **`.trim()` on all env vars** — `vercel env add` via stdin appends `\n`, breaking API key
- **`SafeImage` client component** — `next/image` doesn't handle 404/400 gracefully; hides silently on error
- **No theme toggle** — site is dark-only; ThemeToggle component exists but is not rendered (no light-mode styles)
- **Ghost Members for newsletter** — magic-link flow; unsubscribe is built into every Ghost email automatically
- **`revalidate = 300` on homepage** — was 3600; lowered so Ghost content changes appear within 5 min

---

## Image Config (next.config.mjs)

Allowed remote domains for `next/image`:
- `karteek.ghost.io`
- `www.karteekn.com`
- `karteekn.com`
- `static.ghost.org`
- `**.ghost.io` (wildcard for Ghost CDN subdomains)
- `www.gravatar.com`
- `images.unsplash.com`

---

## Assets in /public/images

| File | Purpose |
|---|---|
| `og-default.png` | Social sharing OG image (1200×630, generated via Nano Banana) |

---

## Pending / Not Done

- [ ] **Production deploy** — `vercel --prod` not yet run; domain `karteekn.com` not pointed to Vercel
- [ ] **Custom domain DNS** — point `karteekn.com` A/CNAME records to Vercel
- [ ] **Social links** — Footer icons are de-linked; user to provide real GitHub/LinkedIn/X URLs
- [ ] **Newsletter test** — Ghost Members subscription not yet tested end-to-end; requires Ghost Admin → Settings → Members enabled + email sending configured
- [ ] **About page hero image** — no dedicated about-hero image; uses CSS-only layout
- [ ] **Light mode** — ThemeToggle removed; full light-mode styling not implemented

---

## Known Issues / Watchlist

- **Hydration warnings** (React #418/#423/#425) — appeared in console; likely resolved after fixing image 400 errors; monitor after prod deploy
- **Ghost image alt text** — Ghost-authored post HTML may contain `<img>` without alt attributes; not fixable at code level, content-side issue
- **Newsletter 500 risk** — if Ghost is configured with site URL `https://www.karteekn.com`, the Members magic-link API may reject requests; switch to Buttondown/Resend if this happens

---

## How to Deploy to Production

```bash
vercel --prod
```

Then in Vercel dashboard → Domains → add `karteekn.com` and `www.karteekn.com`.  
Update DNS at your registrar: CNAME `www` → `cname.vercel-dns.com` (or A record per Vercel's instructions).
