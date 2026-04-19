import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/layout/Layout'
import Timeline from '@/components/about/Timeline'
import SkillBadges from '@/components/about/SkillBadges'
import { getAuthor } from '@/lib/ghost'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'About',
  description:
    'ServiceNow Architect with 14+ years building enterprise platforms. Real experience, practical insights.',
}

const philosophy = [
  {
    principle: 'Practical over theoretical',
    detail:
      'Every pattern I share has been tested under production load, not just in a sandbox.',
  },
  {
    principle: 'Depth over breadth',
    detail:
      'I go deep on the things that matter — architecture decisions that compound over years.',
  },
  {
    principle: 'Honest about tradeoffs',
    detail:
      'No silver bullets. Every approach has a cost. I write about both sides.',
  },
]

export default async function AboutPage() {
  const author = await getAuthor()

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#2a2a2a] py-24">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-amber-500">
            About
          </p>
          <h1 className="mb-6 font-serif text-4xl leading-tight text-white sm:text-5xl">
            Building what others spec
          </h1>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-400">
            ServiceNow Architect with 14+ years of hands-on platform experience.
            I&apos;ve architected solutions for Fortune 500 enterprises, built custom apps,
            and debugged enough integrations to know where every body is buried.
          </p>

          {author?.profile_image && (
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-amber-500/30">
              <Image
                src={author.profile_image}
                alt="Karteek N"
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          )}
        </div>
      </section>

      <Timeline />
      <SkillBadges />

      {/* Philosophy */}
      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <div className="border-t border-[#2a2a2a] pt-16">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-amber-500">
            Philosophy
          </p>
          <h2 className="mb-10 font-serif text-3xl text-white">
            How I think about this work
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            {philosophy.map((item) => (
              <div
                key={item.principle}
                className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-6"
              >
                <h3 className="mb-3 font-serif text-lg text-amber-500">
                  {item.principle}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#2a2a2a] bg-[#111] py-16">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <h2 className="mb-4 font-serif text-3xl text-white">Ready to dig in?</h2>
          <p className="mb-8 text-gray-400">
            Start with the articles. No fluff, no filler.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-medium text-black transition-all hover:bg-amber-400"
          >
            Read Articles →
          </Link>
        </div>
      </section>
    </Layout>
  )
}
