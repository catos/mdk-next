/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  async redirects() {
    return [
      {
        source: "/oppskrifter/:slug*",
        destination: "/recipes/:slug*",
        locale: false,
        permanent: false,
      },
    ]
  },
}
