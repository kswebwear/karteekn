import type { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import Hero from '@/components/home/Hero'
import FeaturedPost from '@/components/home/FeaturedPost'
import ArticleGrid from '@/components/home/ArticleGrid'
import NewsletterCTA from '@/components/home/NewsletterCTA'
import { getPosts, getTags } from '@/lib/ghost'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Karteek N — ServiceNow Architect',
  description:
    'Practical solutions from real projects. ServiceNow architecture, integrations, and technical deep-dives by Karteek N.',
}

export default async function HomePage() {
  const [posts, tags] = await Promise.all([
    getPosts(50),
    getTags(),
  ])

  const [featured, ...rest] = posts

  return (
    <Layout>
      <Hero />
      {featured && <FeaturedPost post={featured} />}
      <ArticleGrid posts={rest} tags={tags} />
      <NewsletterCTA />
    </Layout>
  )
}
