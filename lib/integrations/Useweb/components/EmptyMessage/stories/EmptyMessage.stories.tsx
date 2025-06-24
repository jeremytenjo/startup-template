//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import EmptyMessage, { type EmptyMessageProps } from '@useweb/ui/EmptyMessage'

const defaultArgs: EmptyMessageProps = {
  title: 'EmptyMessage',
}

export default {
  title: 'lib/components/useweb/EmptyMessage',
  component: EmptyMessage,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: EmptyMessageProps) => {
  return (
    <>
      <EmptyMessage {...args} />
    </>
  )
}

export const Default = {
  render: (args: EmptyMessageProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies EmptyMessageProps
// }
