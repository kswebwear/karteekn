import type { PostCard } from '@/lib/types'
import ArticleCard from '@/components/shared/ArticleCard'

interface RelatedPostsProps {
  posts: PostCard[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="border-t border-[#2a2a2a] pt-12">
        <h2 className="mb-8 font-serif text-2xl text-white">Related Articles</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
