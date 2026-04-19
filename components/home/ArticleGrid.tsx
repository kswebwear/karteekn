'use client'

import { useState } from 'react'
import type { PostCard, Tag } from '@/lib/types'
import ArticleCard from '@/components/shared/ArticleCard'
import TagFilter from './TagFilter'

interface ArticleGridProps {
  posts: PostCard[]
  tags: Tag[]
}

const PAGE_SIZE = 6

export default function ArticleGrid({ posts, tags }: ArticleGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const filtered = activeTag
    ? posts.filter((p) => p.tags.some((t) => t.slug === activeTag))
    : posts

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  return (
    <section id="articles" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-serif text-2xl text-white">All Articles</h2>
        <span className="text-sm text-gray-600">{filtered.length} posts</span>
      </div>

      <TagFilter tags={tags} activeTag={activeTag} onTagChange={(tag) => {
        setActiveTag(tag)
        setVisibleCount(PAGE_SIZE)
      }} />

      {visible.length === 0 ? (
        <p className="py-16 text-center text-gray-500">No articles found.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {visible.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="rounded-lg border border-[#2a2a2a] px-6 py-3 text-sm text-gray-400 transition-all hover:border-amber-500/40 hover:text-amber-500"
          >
            Load more
          </button>
        </div>
      )}
    </section>
  )
}
