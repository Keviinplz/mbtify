/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["platform-lookaside.fbsbx.com", "static.neris-assets.com", "scontent-iad3-1.xx.fbcdn.net"]
  }
}

module.exports = nextConfig
