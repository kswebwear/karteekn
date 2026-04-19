'use client'

export default function BackToTop() {
  return (
    <div className="mx-auto max-w-[720px] px-4 pb-16 sm:px-6">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="text-sm text-gray-500 transition-colors hover:text-amber-500"
      >
        ↑ Back to top
      </button>
    </div>
  )
}
