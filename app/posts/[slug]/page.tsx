import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Layout from '@/components/layout/Layout'
import PostHeader from '@/components/post/PostHeader'
import PostBody from '@/components/post/PostBody'
import AuthorCard from '@/components/post/AuthorCard'
import RelatedPosts from '@/components/post/RelatedPosts'
import BackToTop from '@/components/post/BackToTop'
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/ghost'
import { absoluteUrl } from '@/lib/utils'

export const revalidate = 3600

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      url: absoluteUrl(`/posts/${post.slug}`),
      type: 'article',
      publishedTime: post.published_at,
      images: post.feature_image
        ? [{ url: post.feature_image, width: 1200, height: 630 }]
        : [{ url: absoluteUrl('/images/og-default.png'), width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.feature_image
        ? [post.feature_image]
        : [absoluteUrl('/images/og-default.png')],
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  const related = post.primary_tag
    ? await getRelatedPosts(post.slug, post.primary_tag.slug)
    : []

  return (
    <Layout>
      {post.feature_image && (
        <div className="relative h-64 w-full sm:h-80 lg:h-96">
          <Image
            src={post.feature_image}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0e0e0e]" />
        </div>
      )}

      <PostHeader post={post} />
      <PostBody html={post.html} />

      {post.authors[0] && <AuthorCard author={post.authors[0]} />}
      {related.length > 0 && <RelatedPosts posts={related} />}

      <BackToTop />
    </Layout>
  )
}
