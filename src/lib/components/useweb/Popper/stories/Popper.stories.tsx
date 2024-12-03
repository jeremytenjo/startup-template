//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import Popper, { type PopperProps } from '@useweb/ui/Popper'

const defaultArgs: PopperProps = {
  open: true,
}

export default {
  title: 'lib/components/useweb/Popper',
  component: Popper,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: PopperProps) => {
  return (
    <>
      <Popper {...args} />
    </>
  )
}

export const Default = {
  render: (args: PopperProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies PopperProps
// }
