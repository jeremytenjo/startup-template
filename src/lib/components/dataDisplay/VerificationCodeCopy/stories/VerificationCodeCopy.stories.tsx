//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import VerificationCodeCopy, {
  type VerificationCodeCopyProps,
} from '../VerificationCodeCopy.js'

const defaultArgs: VerificationCodeCopyProps = {
  code: '123456',
  copied: false,
  onCopy: () => null,
}

export default {
  title: 'lib/components/dataDisplay/VerificationCodeCopy',
  component: VerificationCodeCopy,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: VerificationCodeCopyProps) => {
  return (
    <>
      <VerificationCodeCopy {...args} />
    </>
  )
}

export const Default = {
  render: (args: VerificationCodeCopyProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies VerificationCodeCopyProps
// }
