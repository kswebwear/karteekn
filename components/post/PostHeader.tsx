'use client'

import { useEffect, useState } from 'react'
import TagBadge from '@/components/shared/TagBadge'
import ReadingTime from '@/components/shared/ReadingTime'
import { formatDate } from '@/lib/utils'
import type { FullPost } from '@/lib/types'

interface PostHeaderProps {
  post: FullPost
}

export default function PostHeader({ post }: PostHeaderProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function updateProgress() {
      const el = document.documentElement
      const scrollTop = el.scrollTop || document.body.scrollTop
      const scrollHeight = el.scrollHeight - el.clientHeight
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0)
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <>
      <div
        id="reading-progress"
        style={{ width: `${progress}%` }}
        aria-hidden
      />

      <header className="mx-auto max-w-[720px] px-4 pb-8 pt-16 sm:px-6">
        <div className="mb-4 flex items-center gap-3">
          {post.primary_tag && <TagBadge tag={post.primary_tag} />}
          <ReadingTime minutes={post.reading_time} />
        </div>

        <h1 className="mb-6 font-serif text-4xl leading-tight text-white sm:text-5xl">
          {post.title}
        </h1>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          {post.authors[0] && (
            <>
              <span>{post.authors[0].name}</span>
              <span>·</span>
            </>
          )}
          <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
        </div>
      </header>
    </>
  )
}
