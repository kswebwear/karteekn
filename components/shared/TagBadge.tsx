import Link from 'next/link'
import type { Tag } from '@/lib/types'

interface TagBadgeProps {
  tag: Tag
  asLink?: boolean
}

export default function TagBadge({ tag, asLink = true }: TagBadgeProps) {
  const classes =
    'inline-block rounded px-2 py-0.5 text-xs font-medium text-amber-500 bg-amber-500/10 transition-colors hover:bg-amber-500/20'

  if (!asLink) {
    return <span className={classes}>#{tag.name}</span>
  }

  return (
    <Link href={`/tag/${tag.slug}`} className={classes}>
      #{tag.name}
    </Link>
  )
}
