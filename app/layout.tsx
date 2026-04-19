import type { Metadata } from 'next'
import { Fraunces, IBM_Plex_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://karteekn.com'
  ),
  title: {
    default: 'Karteek N — ServiceNow Architect',
    template: '%s | Karteek N',
  },
  description:
    'Practical solutions from real projects. ServiceNow architecture, integrations, and technical deep-dives by Karteek N.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://karteekn.com',
    siteName: 'Karteek N',
    images: [{ url: '/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@karteekn',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
