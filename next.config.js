console.log(`Using basePath: ${process.env.NEXT_PUBLIC_BASE_PATH}`);

const withPWA = require('next-pwa')({
  dest: process.env.NEXT_PUBLIC_BASE_PATH,
  // disable: process.env.NODE_ENV === "development"
})


/** @type {import('next').NextConfig} */
const nextConfig = 
  withPWA({
    // reactStrictMode: true,
    // dest: process.env.NEXT_PUBLIC_BASE_PATH,
    // assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
    // pwa: {
    //   dest: "public",
    //   // register: true,
    //   // skipWaiting: true,
    //   disable: process.env.NODE_ENV === "development",
    // },
  })

module.exports = nextConfig
