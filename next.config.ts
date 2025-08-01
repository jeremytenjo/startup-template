import withBundleAnalyzer from '@next/bundle-analyzer'
import createMDX from '@next/mdx'
import type { NextConfig } from 'next'
import { codeInspectorPlugin } from 'code-inspector-plugin'

const withBundleAnalyzerFn = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default async () => {
  const nextConfig = withBundleAnalyzerFn(
    withMDX({
      transpilePackages: ['@useweb'],
      devIndicators: false,
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
      outputFileTracingExcludes: {
        '*': [
          'node_modules/@swc/core-linux-x64-gnu',
          'node_modules/@swc/core-linux-x64-musl',
          'node_modules/@esbuild/linux-x64',
        ],
      },
      pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
      webpack: (config) => {
        // allow importing ts files with .js
        config.resolve.extensionAlias = {
          '.js': ['.ts', '.tsx', '.js'],
        }

        config.plugins.push(
          codeInspectorPlugin({
            bundler: 'webpack',
            hotKeys: ['altKey'],
            hideConsole: true,
          }),
        )

        return config
      },
    }) satisfies NextConfig,
  )

  return nextConfig
}
