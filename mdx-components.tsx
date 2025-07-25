import type { MDXComponents } from 'mdx/types'

/**
 * Customize MDX components for Next.js MDX integration
 *
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/mdx-components MDX Components API Reference}
 * @see {@link https://nextjs.org/docs/app/guides/mdx#global-styles-and-components MDX Global Styles Guide}
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}
