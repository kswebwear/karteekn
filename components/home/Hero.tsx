import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      {/* Hero background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/og-default.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-20"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e]/60 via-transparent to-[#0e0e0e]" />

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
