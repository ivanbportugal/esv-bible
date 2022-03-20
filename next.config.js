const withPWA = require('next-pwa')

console.log(`Using basePath: ${process.env.NEXT_PUBLIC_BASE_PATH}`);

/** @type {import('next').NextConfig} */
const nextConfig = 
  withPWA({
    reactStrictMode: true,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
    pwa: {
      dest: "public",
      register: true,
      skipWaiting: true,
      disable: process.env.NODE_ENV === "development",
    },
  })

module.exports = nextConfig
