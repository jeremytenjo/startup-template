//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import SidebarLayout, { type SidebarLayoutProps } from '../SidebarLayout.js'

const defaultArgs: SidebarLayoutProps = {
  sidebarComponent: 'sidebarComponent',
  children: 'children',
  navLinks: {
    links: [
      {
        label: 'label',
      },
    ],
  },
}

export default {
  title: 'lib/layouts/SidebarLayout',
  component: SidebarLayout,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: SidebarLayoutProps) => {
  return (
    <>
      <SidebarLayout {...args} />
    </>
  )
}

export const Default = {
  render: (args: SidebarLayoutProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies SidebarLayoutProps
// }
