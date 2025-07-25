import React from 'react'
import Text from '@useweb/ui/Text'
import Link from '@useweb/ui/Link'
import type { MDXComponents } from 'mdx/types'

import PageTitleHeading from './lib/layouts/PageTitleHeading/PageTitleHeading.js'
import { variants } from './lib/integrations/Useweb/theme/tokens/typography/typography.js'

/**
 * Customize MDX components for Next.js MDX integration
 *
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/mdx-components MDX Components API Reference}
 * @see {@link https://nextjs.org/docs/app/guides/mdx#global-styles-and-components MDX Global Styles Guide}
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => {
      return <PageTitleHeading title={String(children)} />
    },

    h2: ({ children }) => {
      return (
        <Text
          text={String(children)}
          tag='h2'
          sx={{
            ...variants.h6,
            mb: 1,
          }}
        />
      )
    },

    h3: ({ children }) => {
      return (
        <Text
          text={String(children)}
          tag='h3'
          sx={{
            ...variants.h6,
            mb: 1,
          }}
        />
      )
    },

    h4: ({ children }) => {
      return (
        <Text
          text={String(children)}
          tag='h4'
          sx={{
            ...variants.h6,
            mb: 1,
          }}
        />
      )
    },

    h5: ({ children }) => {
      return (
        <Text
          text={String(children)}
          tag='h5'
          sx={{
            ...variants.h6,
            mb: 1,
          }}
        />
      )
    },

    h6: ({ children }) => {
      return (
        <Text
          text={String(children)}
          tag='h6'
          sx={{
            ...variants.h6,
            mb: 1,
          }}
        />
      )
    },

    p: ({ children }) => {
      const hasHref = React.Children.toArray(children).some((child) => {
        return React.isValidElement(child) && child.props?.href
      })

      if (hasHref) {
        const childrenArray = children as { props: any }[]
        return (
          <p
            style={{
              marginBottom: '16px',
            }}
          >
            {childrenArray?.map?.((child, index) => {
              const childProps = (child.props || {}) as any
              const hasHref = React.isValidElement(child) && childProps?.href

              if (hasHref) {
                return (
                  <Link
                    key={index}
                    {...(child.props as any)}
                    sx={{
                      ...childProps?.sx,
                      fontWeight: 'bold',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  />
                )
              }

              if (typeof child === 'string') {
                return <Text key={index} text={child} tag='span' sx={{}} />
              }

              return children
            })}
          </p>
        )
      }

      return (
        <Text
          text={String(children)}
          tag='p'
          sx={{
            mb: 2,
          }}
        />
      )
    },

    li: ({ children }) => {
      return (
        <li style={{ marginBottom: '0.5rem' }}>
          <Text text={children} tag='p' sx={{}} />
        </li>
      )
    },

    ...components,
  }
}
