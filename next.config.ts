import type { NextConfig } from 'next'
import withPWA from '@ducanh2912/next-pwa'
 
const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@chakra-ui/react', '@chakra-ui/system', '@chakra-ui/icons'],
  turbopack: {},
}
 
export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
})(nextConfig)