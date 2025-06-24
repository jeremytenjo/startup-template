//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import SectionHeader, { type SectionHeaderProps } from '@useweb/ui/SectionHeader'

const defaultArgs: SectionHeaderProps = {
  title: 'SectionHeader',
}

export default {
  title: 'lib/components/useweb/SectionHeader',
  component: SectionHeader,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: SectionHeaderProps) => {
  return (
    <>
      <SectionHeader {...args} />
    </>
  )
}

export const Default = {
  render: (args: SectionHeaderProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies SectionHeaderProps
// }
