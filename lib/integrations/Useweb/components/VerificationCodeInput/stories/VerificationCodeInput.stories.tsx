//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import VerificationCodeInput, {
  type VerificationCodeInputProps,
} from '@useweb/ui/VerificationCodeInput'

const defaultArgs: VerificationCodeInputProps = {}

export default {
  title: 'lib/components/useweb/VerificationCodeInput',
  component: VerificationCodeInput,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: VerificationCodeInputProps) => {
  return (
    <>
      <VerificationCodeInput {...args} />
    </>
  )
}

export const Default = {
  render: (args: VerificationCodeInputProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies VerificationCodeInputProps
// }
