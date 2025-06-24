//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import NavLink, { type NavLinkProps } from '@useweb/ui/NavLink'

const defaultArgs: NavLinkProps = {
  href: '/',
}

export default {
  title: 'lib/components/useweb/NavLink',
  component: NavLink,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: NavLinkProps) => {
  return (
    <>
      <NavLink {...args} />
    </>
  )
}

export const Default = {
  render: (args: NavLinkProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies NavLinkProps
// }
