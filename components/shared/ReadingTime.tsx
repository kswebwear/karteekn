interface ReadingTimeProps {
  minutes: number | null
}

export default function ReadingTime({ minutes }: ReadingTimeProps) {
  if (!minutes) return null
  return (
    <span className="text-xs text-gray-500">
      {minutes} min read
    </span>
  )
}
