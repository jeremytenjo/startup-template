//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import ConfirmationButton, {
  type ConfirmationButtonProps,
} from '@useweb/ui/ConfirmationButton'

const defaultArgs: ConfirmationButtonProps = {
  fn: {
    fn: async () => {return null},
  },
  acceptButtonProps: {} as any,
  dialogProps: {} as any,
  triggerButtonProps: {} as any,
}

export default {
  title: 'lib/components/useweb/ConfirmationButton',
  component: ConfirmationButton,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: ConfirmationButtonProps) => {
  return (
    <>
      <ConfirmationButton {...args} />
    </>
  )
}

export const Default = {
  render: (args: ConfirmationButtonProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies ConfirmationButtonProps
// }
