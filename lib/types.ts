export interface Tag {
  id: string
  name: string
  slug: string
  count?: { posts: number }
}

export interface Author {
  name: string
  bio: string | null
  profile_image: string | null
  website: string | null
}

export interface PostCard {
  id: string
  title: string
  slug: string
  excerpt: string | null
  tags: Tag[]
  primary_tag: Tag | null
  reading_time: number | null
  published_at: string
  feature_image: string | null
}

export interface FullPost extends PostCard {
  html: string
  authors: Author[]
}
