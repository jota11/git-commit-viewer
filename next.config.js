/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
        "avatars.githubusercontent.com",
        "secure.gravatar.com"
    ]
  },
  async redirects() {
    return [
      {
        source: "/r",
        destination: "/",
        permanent: false
      },
      {
        source: "/statistics",
        destination: "/stats",
        permanent: false
      }
    ]
  }
}

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")]
  }
}

module.exports = nextConfig
