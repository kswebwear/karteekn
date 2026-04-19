import type { MetadataRoute } from 'next'
import { getAllPostSlugs, getTags } from '@/lib/ghost'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://karteekn.com'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, tags] = await Promise.all([getAllPostSlugs(), getTags()])

  const posts = slugs.map((slug) => ({
    url: `${BASE}/posts/${slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const tagPages = tags.map((tag) => ({
    url: `${BASE}/tag/${tag.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [
    { url: BASE, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE}/about`, changeFrequency: 'monthly', priority: 0.7 },
    ...posts,
    ...tagPages,
  ]
}
