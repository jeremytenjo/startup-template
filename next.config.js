import withBundleAnalyzer from '@next/bundle-analyzer'

import appConfig from './app.config.js'

const withBundleAnalyzerFn = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default async () => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = withBundleAnalyzerFn({
    transpilePackages: ['@useweb'],
    env: {
      nextjsPort: String(appConfig.nextjs.port),
    },
    images: {
      unoptimized: process.env.NODE_ENV !== 'production',
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'placehold.co',
        },
        {
          protocol: 'https',
          hostname: 'images.prismic.io',
        },
        {
          protocol: 'https',
          hostname: 'i.pravatar.cc',
        },
        {
          protocol: 'https',
          hostname: 's3-alpha-sig.figma.com',
        },
        {
          protocol: 'http',
          hostname: 'localhost',
        },
        {
          protocol: 'https',
          hostname: 'localhost',
        },
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
        },
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
        },
        {
          protocol: 'https',
          hostname: 'https://s3.amazonaws.com',
        },
        {
          protocol: 'https',
          hostname: '**.rbxcdn.com',
        },
        {
          protocol: 'https',
          hostname: 'www.notion.so',
        },
        {
          protocol: 'https',
          hostname: 'i.ytimg.com',
        },
        {
          protocol: 'https',
          hostname: 'yt3.googleusercontent.com',
        },
        {
          protocol: 'https',
          hostname: '**.epicgames.com',
        },
      ],
    },
    experimental: {
      outputFileTracingExcludes: {
        '*': [
          'node_modules/@swc/core-linux-x64-gnu',
          'node_modules/@swc/core-linux-x64-musl',
          'node_modules/@esbuild/linux-x64',
        ],
      },
    },
    webpack: (config) => {
      // allow importing ts files with .js
      config.resolve.extensionAlias = {
        '.js': ['.ts', '.tsx', '.js'],
      }

      return config
    },
  })

  return nextConfig
}
