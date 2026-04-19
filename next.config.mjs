/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'karteek.ghost.io',
      },
      {
        protocol: 'https',
        hostname: 'static.ghost.org',
      },
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
