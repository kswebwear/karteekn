'use client'

import type { Tag } from '@/lib/types'

interface TagFilterProps {
  tags: Tag[]
  activeTag: string | null
  onTagChange: (tag: string | null) => void
}

export default function TagFilter({ tags, activeTag, onTagChange }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onTagChange(null)}
        className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
          activeTag === null
            ? 'bg-amber-500 text-black font-medium'
            : 'border border-[#2a2a2a] text-gray-400 hover:border-amber-500/40 hover:text-amber-500'
        }`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag.slug}
          onClick={() => onTagChange(tag.slug)}
          className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
            activeTag === tag.slug
              ? 'bg-amber-500 text-black font-medium'
              : 'border border-[#2a2a2a] text-gray-400 hover:border-amber-500/40 hover:text-amber-500'
          }`}
        >
          {tag.name}
        </button>
      ))}
    </div>
  )
}
