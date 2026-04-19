'use client'

import { useState } from 'react'

export default function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="border-y border-[#2a2a2a] bg-[#111] py-16">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-amber-500">
          Newsletter
        </p>
        <h2 className="mb-3 font-serif text-3xl text-white">Stay updated</h2>
        <p className="mb-8 text-gray-400">
          Deep-dives on ServiceNow architecture, real-world integrations, and technical
          patterns — delivered when I publish, not on a schedule.
        </p>

        {status === 'success' ? (
          <p className="text-amber-500">
            ✓ Check your inbox to confirm your subscription.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-amber-500/60"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-lg bg-amber-500 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-amber-400 disabled:opacity-60"
            >
              {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-3 text-sm text-red-400">Something went wrong. Please try again.</p>
        )}

        <p className="mt-4 text-xs text-gray-600">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}
