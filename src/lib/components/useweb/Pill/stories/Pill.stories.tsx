//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import Pill, { type PillProps } from '@useweb/ui/Pill'

const defaultArgs: PillProps = {
  label: 'Pill',
  selected: false,
}

export default {
  title: 'lib/components/useweb/Pill',
  component: Pill,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: PillProps) => {
  return (
    <>
      <Pill {...(args as any)} />
    </>
  )
}

export const Default = {
  render: (args: PillProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies PillProps
// }
