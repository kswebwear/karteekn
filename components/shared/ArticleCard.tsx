import Link from 'next/link'
import Image from 'next/image'
import type { PostCard } from '@/lib/types'
import TagBadge from './TagBadge'
import ReadingTime from './ReadingTime'
import { formatDate, truncate } from '@/lib/utils'

interface ArticleCardProps {
  post: PostCard
}

export default function ArticleCard({ post }: ArticleCardProps) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="amber-glow h-full rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-6 transition-all duration-300 hover:border-amber-500/40 hover:bg-[#1f1f1f]">
        {post.feature_image && (
          <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
            <Image
              src={post.feature_image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}

        <div className="flex flex-col gap-3">
          {post.primary_tag && (
            <TagBadge tag={post.primary_tag} asLink={false} />
          )}

          <h2 className="font-serif text-xl leading-snug text-white transition-colors group-hover:text-amber-500/90 line-clamp-2">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="text-sm leading-relaxed text-gray-400 line-clamp-3">
              {truncate(post.excerpt, 160)}
            </p>
          )}

          <div className="flex items-center gap-3 pt-1">
            <time className="text-xs text-gray-600" dateTime={post.published_at}>
              {formatDate(post.published_at)}
            </time>
            {post.reading_time && (
              <>
                <span className="text-gray-700">·</span>
                <ReadingTime minutes={post.reading_time} />
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
