//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import ActionBoxCtas, { type ActionBoxCtasProps } from '@useweb/ui/ActionBoxCtas'

const defaultArgs: ActionBoxCtasProps = {
  title: 'ActionBoxCtas',
}

export default {
  title: 'lib/components/useweb/ActionBoxCtas',
  component: ActionBoxCtas,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: ActionBoxCtasProps) => {
  return (
    <>
      <ActionBoxCtas {...args} />
    </>
  )
}

export const Default = {
  render: (args: ActionBoxCtasProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies ActionBoxCtasProps
// }
