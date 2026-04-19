import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#0e0e0e',
        surface: '#1a1a1a',
        border: '#2a2a2a',
        amber: {
          DEFAULT: '#f59e0b',
        },
      },
      fontFamily: {
        serif: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-ibm-plex-mono)', 'Menlo', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#e5e7eb',
            a: { color: '#f59e0b', '&:hover': { color: '#fbbf24' } },
            h1: { color: '#ffffff', fontFamily: 'var(--font-instrument-serif)' },
            h2: { color: '#ffffff', fontFamily: 'var(--font-instrument-serif)' },
            h3: { color: '#ffffff', fontFamily: 'var(--font-instrument-serif)' },
            h4: { color: '#f3f4f6' },
            strong: { color: '#ffffff' },
            code: {
              color: '#f59e0b',
              backgroundColor: '#1a1a1a',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: {
              backgroundColor: '#111111',
              border: '1px solid #2a2a2a',
            },
            blockquote: {
              color: '#9ca3af',
              borderLeftColor: '#f59e0b',
            },
            hr: { borderColor: '#2a2a2a' },
            'ul > li::marker': { color: '#f59e0b' },
            'ol > li::marker': { color: '#f59e0b' },
          },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
