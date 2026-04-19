export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '...'
}

export function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://karteekn.com'
  return `${base}${path}`
}
