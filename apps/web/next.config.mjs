/** @type {import('next').NextConfig} */
// Next.js configuration enabling React strict mode and SWC minification
const nextConfig = {
  transpilePackages: ['@stanpi/data'],
  reactStrictMode: true,
  swcMinify: true
};

export default nextConfig;
