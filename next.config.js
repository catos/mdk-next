/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  async rewrites() {    
    return [
      {
        source: "/oppskrifter/:slug*",
        destination: "/recipes/:slug*",
      },
      {
        source: "/logg-inn",
        destination: "/login",
      }
    ]
  },
}
