/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      API_READ_ACCESS_TOKEN: process.env.API_READ_ACCESS_TOKEN,
      BASE_URL: process.env.BASE_URL,
      MONGODB_URI: process.env.MONGODB_URI
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'image.tmdb.org',
            port: '',
            pathname: '/t/p/**',
          },
        ],
      },
};

export default nextConfig;
