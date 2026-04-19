import type { PostCard, FullPost, Tag, Author } from './types'

const GHOST_URL = process.env.GHOST_URL!.trim()
const GHOST_KEY = process.env.GHOST_CONTENT_API_KEY!.trim()
const API_BASE = `${GHOST_URL}/ghost/api/content`

async function ghostFetch<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  const url = new URL(`${API_BASE}/${endpoint}/`)
  url.searchParams.set('key', GHOST_KEY)
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v)
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    throw new Error(`Ghost API error: ${res.status} ${res.statusText}`)
  }

  return res.json() as Promise<T>
}

interface GhostTag {
  id: string
  name: string
  slug: string
  count?: { posts: number }
}

interface GhostAuthor {
  name: string
  bio: string | null
  profile_image: string | null
  website: string | null
}

interface GhostPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  html: string
  tags: GhostTag[]
  primary_tag: GhostTag | null
  authors: GhostAuthor[]
  reading_time: number | null
  published_at: string
  feature_image: string | null
}

function mapTag(t: GhostTag): Tag {
  return { id: t.id, name: t.name, slug: t.slug, count: t.count }
}

function mapPostCard(p: GhostPost): PostCard {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    tags: (p.tags ?? []).map(mapTag),
    primary_tag: p.primary_tag ? mapTag(p.primary_tag) : null,
    reading_time: p.reading_time,
    published_at: p.published_at,
    feature_image: p.feature_image,
  }
}

function mapFullPost(p: GhostPost): FullPost {
  return {
    ...mapPostCard(p),
    html: p.html,
    authors: (p.authors ?? []).map((a) => ({
      name: a.name,
      bio: a.bio,
      profile_image: a.profile_image,
      website: a.website,
    })),
  }
}

export async function getPosts(limit = 10, tag?: string): Promise<PostCard[]> {
  const params: Record<string, string> = {
    limit: String(limit),
    include: 'tags',
    fields:
      'id,title,slug,excerpt,reading_time,published_at,feature_image,primary_tag',
  }
  if (tag) params.filter = `tag:${tag}`

  const data = await ghostFetch<{ posts: GhostPost[] }>('posts', params)
  return data.posts.map(mapPostCard)
}

export async function getAllPostSlugs(): Promise<string[]> {
  const data = await ghostFetch<{ posts: { slug: string }[] }>('posts', {
    limit: 'all',
    fields: 'slug',
  })
  return data.posts.map((p) => p.slug)
}

export async function getPostBySlug(slug: string): Promise<FullPost | null> {
  try {
    const data = await ghostFetch<{ posts: GhostPost[] }>('posts', {
      filter: `slug:${slug}`,
      limit: '1',
      include: 'tags,authors',
    })
    if (!data.posts.length) return null
    return mapFullPost(data.posts[0])
  } catch {
    return null
  }
}

export async function getRelatedPosts(
  currentSlug: string,
  tagSlug: string,
  limit = 3
): Promise<PostCard[]> {
  const data = await ghostFetch<{ posts: GhostPost[] }>('posts', {
    filter: `tag:${tagSlug}+slug:-${currentSlug}`,
    limit: String(limit),
    include: 'tags',
    fields:
      'id,title,slug,excerpt,reading_time,published_at,feature_image,primary_tag',
  })
  return data.posts.map(mapPostCard)
}

export async function getTags(): Promise<Tag[]> {
  const data = await ghostFetch<{ tags: GhostTag[] }>('tags', {
    limit: 'all',
    include: 'count.posts',
  })
  return data.tags.map(mapTag)
}

export async function getAuthor(): Promise<Author | null> {
  try {
    const data = await ghostFetch<{ authors: GhostAuthor[] }>('authors', {
      limit: '1',
    })
    if (!data.authors.length) return null
    const a = data.authors[0]
    return {
      name: a.name,
      bio: a.bio,
      profile_image: a.profile_image,
      website: a.website,
    }
  } catch {
    return null
  }
}
