//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import ActionBox, { type ActionBoxProps } from '@useweb/ui/ActionBox'
import Button from '@useweb/ui/Button'

const defaultArgs: ActionBoxProps = {
  children: 'ActionBox',
  ctas: (
    <>
      <Button name='Hello' sx={{}}>
        Hello
      </Button>
      <Button name='Send' sx={{}}>
        Send
      </Button>
    </>
  ),
}

export default {
  title: 'lib/components/useweb/ActionBox',
  component: ActionBox,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: ActionBoxProps) => {
  return (
    <>
      <ActionBox {...args} />
    </>
  )
}

export const Default = {
  render: (args: ActionBoxProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies ActionBoxProps
// }
