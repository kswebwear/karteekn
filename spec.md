# karteekn.com — Project Specification

## Overview
A fully custom Next.js frontend replacing the default Ghost theme for karteekn.com. Ghost remains as the headless CMS. The site represents Karteek's personal brand: a ServiceNow Architect with 14+ years of experience sharing deep, practical technical content.

**Goal**: Modern, minimal, dark-first personal blog that feels like a premium technical resource — not a generic Ghost blog.

---

## Design Direction

### Aesthetic
- **Theme**: Dark-first. Deep charcoal/near-black base (`#0e0e0e`), not pure black
- **Accent**: Single warm accent color — amber/gold (`#f59e0b`) to convey expertise and warmth
- **Typography**:
  - Display/Headings: `Instrument Serif` or `Lora` — editorial, trustworthy
  - Body: `IBM Plex Mono` or `Geist Mono` — technical, readable, on-brand for a dev blog
- **Motion**: Subtle fade-ins on scroll, smooth hover states, no gimmicks
- **Layout**: Clean asymmetric grid, generous whitespace, editorial feel

### Tone
Professional but personal. Not corporate. Not tutorial-site. Think: senior engineer's notebook made public.

---

## Pages

### 1. Homepage `/`
**Sections (top to bottom):**

#### Hero
- Name: **Karteek N**
- Title: `ServiceNow Architect · 14+ Years`
- One-liner: `"Practical solutions from real projects. Not textbook implementations."`
- CTA button: `→ Read Articles`
- Subtle background: noise texture or faint grid pattern

#### Featured Article
- Pull the latest/pinned post from Ghost
- Large card with title, excerpt, tag, read time, date
- Hover: slight scale + amber border glow

#### Article Grid
- Remaining posts in a 2-column (desktop) / 1-column (mobile) card grid
- Each card: Title, excerpt (truncated), tag badge, read time, date
- Tag filter bar above grid: `All · ServiceNow · Shopify · Web Dev`
- Load more button (no infinite scroll)

#### Newsletter CTA
- Simple full-width section: "Stay updated" + email input + Subscribe button
- Connects to Ghost's built-in subscription

#### Footer
- Links: Home, ServiceNow, About
- Social icons: GitHub, LinkedIn, Twitter/X
- Copyright: `© 2026 Karteek N`
- Remove "Powered by Ghost"

---

### 2. Article Page `/posts/[slug]`

**Layout:**
- Max width: `720px` centered
- Reading progress bar at top (thin amber line)
- Hero: Article title, tag, date, read time
- Body: Ghost HTML rendered with custom `prose` typography styles
- Code blocks: Syntax highlighted via `highlight.js` or `rehype-highlight` — dark theme
- Copy-to-clipboard button on all code snippets

**After Article:**
- Author bio card (name, title, short bio, links)
- Related articles (3 cards, same tag)
- Back to top button

---

### 3. About Page `/about`

**Sections:**
- Hero: Short punchy headline, not just "About Me"
- Experience timeline (visual): Key milestones / tech areas
- Expertise badges: ServiceNow modules, integrations, AI
- Philosophy: Pull the 3 principles from current about page ("Practical over theoretical", etc.)
- CTA: Subscribe or read articles

---

### 4. Tag Page `/tag/[slug]`
- Heading: `#{tag}` articles
- Same article grid as homepage, filtered by tag
- Post count

---

## Components Checklist

```
components/
├── layout/
│   ├── Header.tsx          → Sticky minimal nav
│   ├── Footer.tsx          → Links + social + copyright
│   └── Layout.tsx          → Wraps all pages
├── home/
│   ├── Hero.tsx            → Name, title, CTA
│   ├── FeaturedPost.tsx    → Large featured card
│   ├── ArticleGrid.tsx     → Post cards grid
│   ├── TagFilter.tsx       → Filter bar
│   └── NewsletterCTA.tsx   → Email subscribe section
├── post/
│   ├── PostHeader.tsx      → Title, meta, progress bar
│   ├── PostBody.tsx        → Rendered HTML + code styles
│   ├── AuthorCard.tsx      → Bio card after post
│   ├── RelatedPosts.tsx    → 3 related cards
│   └── CopyButton.tsx      → Copy code snippet
├── shared/
│   ├── ArticleCard.tsx     → Reusable post card
│   ├── TagBadge.tsx        → Colored tag chip
│   ├── ReadingTime.tsx     → "X min read"
│   └── ThemeToggle.tsx     → Dark/light mode switch
└── about/
    ├── Timeline.tsx        → Experience timeline
    └── SkillBadges.tsx     → Tech expertise grid
```

---

## Ghost API Integration

### `lib/ghost.ts`
```ts
import GhostContentAPI from '@tryghost/content-api'

export const ghost = new GhostContentAPI({
  url: process.env.GHOST_URL!,
  key: process.env.GHOST_CONTENT_API_KEY!,
  version: 'v5.0'
})

// Key functions to implement:
// getPosts(limit, tag?) → PostCard[]
// getPostBySlug(slug)   → FullPost
// getTags()             → Tag[]
// getAuthor()           → Author
```

### `lib/types.ts`
Define interfaces:
- `PostCard` — for grid cards (id, title, slug, excerpt, tags, reading_time, published_at, feature_image)
- `FullPost` — extends PostCard with (html, authors)
- `Tag` — (id, name, slug, count)
- `Author` — (name, bio, profile_image, website)

---

## SEO & Metadata

- `generateMetadata()` on every page
- Open Graph tags: title, description, image (feature_image from Ghost)
- Twitter card meta
- `robots.txt` and `sitemap.xml` via Next.js
- Canonical URLs

---

## Image Strategy

### Nano Banana 2 Generated Assets (store in `/public/images/`)
| File | Purpose |
|------|---------|
| `hero-bg.png` | Hero section background texture/visual |
| `og-default.png` | Default OG image for posts without feature image |
| `about-hero.png` | About page visual |
| `avatar.png` | Author avatar (if no Ghost profile image) |

**Prompt guide for Nano Banana:**
- Hero: `"Abstract dark technical background, subtle circuit pattern, deep charcoal with amber highlights, minimal, high quality"`
- OG: `"Clean dark blog card background, minimal geometric, servicenow developer, amber accent"`

---

## Performance Targets
- Lighthouse score: 90+ across all categories
- LCP < 2.5s
- CLS < 0.1
- Use `next/image` with proper `sizes` on all images
- ISR revalidation: 1 hour (`revalidate = 3600`)
- Static generation for all post pages via `generateStaticParams`

---

## Dev Setup

```bash
npx create-next-app@latest karteekn --typescript --tailwind --app
cd karteekn
npm install @tryghost/content-api
npm install @tryghost/content-api
npm install highlight.js
npm install @tailwindcss/typography
```

**`.env.local`**
```
GHOST_URL=https://www.karteekn.com
GHOST_CONTENT_API_KEY=your_key_here
```

Get the API key from: Ghost Admin → Settings → Integrations → Add custom integration

---

## Out of Scope (v1)
- Search (add in v2 with Pagefind)
- Comments
- Members-only content (Ghost membership)
- Analytics (add Plausible in v2)

---

## Launch Checklist
- [ ] Ghost Content API key created
- [ ] All pages rendering real Ghost data
- [ ] Dark/light mode toggle working
- [ ] Code syntax highlighting on all posts
- [ ] Nano Banana images placed and optimised
- [ ] OG metadata on all pages
- [ ] Deployed to Vercel with custom domain `karteekn.com`
- [ ] Ghost custom domain updated to point frontend at Vercel
