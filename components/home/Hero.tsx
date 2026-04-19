import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0e0e0e]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-amber-500">
            ServiceNow Architect · 14+ Years
          </p>

          <h1 className="mb-6 font-serif text-5xl font-normal leading-tight text-white sm:text-6xl lg:text-7xl">
            Karteek N
          </h1>

          <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-400 sm:text-xl">
            &ldquo;Practical solutions from real projects.{' '}
            <span className="text-gray-300">Not textbook implementations.</span>&rdquo;
          </p>

          <Link
            href="#articles"
            className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-medium text-black transition-all hover:bg-amber-400 hover:gap-3"
          >
            Read Articles
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
