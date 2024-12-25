/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: false,
    },
    env: {
      API_READ_ACCESS_TOKEN: process.env.API_READ_ACCESS_TOKEN,
      BASE_URL: process.env.BASE_URL,
      MONGODB_URI: process.env.MONGODB_URI,
      TOKEN_SECRET: process.env.TOKEN_SECRET
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'image.tmdb.org',
            port: '',
            pathname: '/t/p/**',
          },
          {
            protocol: 'https',
            hostname: 'facebook.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'x.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'www.linkedin.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '3000',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'movieapp-six-dusky.vercel.app',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
