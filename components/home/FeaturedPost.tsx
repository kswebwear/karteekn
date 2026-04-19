import Link from 'next/link'
import Image from 'next/image'
import type { PostCard } from '@/lib/types'
import TagBadge from '@/components/shared/TagBadge'
import ReadingTime from '@/components/shared/ReadingTime'
import { formatDate } from '@/lib/utils'

interface FeaturedPostProps {
  post: PostCard
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <p className="mb-6 text-xs font-medium uppercase tracking-widest text-gray-500">
        Featured Article
      </p>

      <Link href={`/posts/${post.slug}`} className="group block">
        <article className="amber-glow grid gap-0 overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] transition-all duration-300 hover:border-amber-500/40 lg:grid-cols-2">
          {post.feature_image ? (
            <div className="relative h-64 lg:h-auto">
              <Image
                src={post.feature_image}
                alt={post.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1a1a] opacity-0 lg:opacity-100" />
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center bg-[#111] lg:h-auto">
              <span className="text-6xl text-amber-500/20 font-serif">K</span>
            </div>
          )}

          <div className="flex flex-col justify-center p-8 lg:p-12">
            {post.primary_tag && (
              <TagBadge tag={post.primary_tag} asLink={false} />
            )}

            <h2 className="mt-4 font-serif text-3xl leading-tight text-white transition-colors group-hover:text-amber-500/90 lg:text-4xl">
              {post.title}
            </h2>

            {post.excerpt && (
              <p className="mt-4 leading-relaxed text-gray-400">
                {post.excerpt}
              </p>
            )}

            <div className="mt-6 flex items-center gap-3">
              <time className="text-sm text-gray-500" dateTime={post.published_at}>
                {formatDate(post.published_at)}
              </time>
              <span className="text-gray-700">·</span>
              <ReadingTime minutes={post.reading_time} />
            </div>

            <span className="mt-6 inline-flex items-center gap-1 text-sm text-amber-500 transition-gap group-hover:gap-2">
              Read article <span aria-hidden>→</span>
            </span>
          </div>
        </article>
      </Link>
    </section>
  )
}
