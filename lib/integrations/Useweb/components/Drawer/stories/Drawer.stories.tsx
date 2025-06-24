//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import Drawer, { type DrawerProps } from '@useweb/ui/Drawer'

const defaultArgs: DrawerProps = {
  children: 'Drawer',
}

export default {
  title: 'lib/components/useweb/Drawer',
  component: Drawer,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: DrawerProps) => {
  return (
    <>
      <Drawer {...args} />
    </>
  )
}

export const Default = {
  render: (args: DrawerProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies DrawerProps
// }
