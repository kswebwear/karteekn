import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Layout from '@/components/layout/Layout'
import ArticleCard from '@/components/shared/ArticleCard'
import { getPosts, getTags } from '@/lib/ghost'

export const revalidate = 3600

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const tags = await getTags()
  return tags.map((tag) => ({ slug: tag.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tags = await getTags()
  const tag = tags.find((t) => t.slug === params.slug)
  if (!tag) return {}

  return {
    title: `#${tag.name} Articles`,
    description: `All articles tagged with ${tag.name} by Karteek N.`,
  }
}

export default async function TagPage({ params }: PageProps) {
  const tags = await getTags()
  const tag = tags.find((t) => t.slug === params.slug)
  if (!tag) notFound()

  const posts = await getPosts(50, params.slug)

  return (
    <Layout>
      <section className="border-b border-[#2a2a2a] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-amber-500">
            Tag
          </p>
          <h1 className="font-serif text-4xl text-white">
            #{tag.name}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <p className="py-16 text-center text-gray-500">No articles yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  )
}
