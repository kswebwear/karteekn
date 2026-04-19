import Image from 'next/image'
import type { Author } from '@/lib/types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="mx-auto max-w-[720px] px-4 pb-16 sm:px-6">
      <div className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-6">
        <div className="flex items-start gap-4">
          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border border-[#2a2a2a]">
            {author.profile_image ? (
              <Image
                src={author.profile_image}
                alt={author.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-amber-500/10">
                <span className="font-serif text-xl text-amber-500">
                  {author.name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="mb-0.5 text-xs font-medium uppercase tracking-widest text-gray-500">
              Written by
            </p>
            <h3 className="font-serif text-lg text-white">{author.name}</h3>
            {author.bio && (
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                {author.bio}
              </p>
            )}
            {author.website && (
              <a
                href={author.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-amber-500 hover:underline"
              >
                Visit website →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
