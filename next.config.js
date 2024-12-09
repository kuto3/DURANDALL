/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    domains: ['gateway.pinata.cloud','indigo-elaborate-panther-207.mypinata.cloud'], // Add the domain hosting your images
    
  },
};

module.exports = nextConfig;
