'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/components/shared/ThemeToggle'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tag/servicenow', label: 'ServiceNow' },
  { href: '/about', label: 'About' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-[#2a2a2a] bg-[#0e0e0e]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-serif text-xl font-normal text-white transition-colors hover:text-amber-500"
        >
          Karteek<span className="text-amber-500">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-amber-500 ${
                pathname === link.href
                  ? 'text-amber-500'
                  : 'text-gray-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="text-gray-400 hover:text-white"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-[#2a2a2a] bg-[#0e0e0e] px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block text-sm transition-colors hover:text-amber-500 ${
                    pathname === link.href ? 'text-amber-500' : 'text-gray-400'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
