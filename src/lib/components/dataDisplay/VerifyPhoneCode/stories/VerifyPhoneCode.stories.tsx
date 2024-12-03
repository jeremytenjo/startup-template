//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import VerifyPhoneCode, { type VerifyPhoneCodeProps } from '../VerifyPhoneCode.js'

const defaultArgs: VerifyPhoneCodeProps = {
  signIn: undefined as any,
}

export default {
  title: 'lib/components/dataDisplay/VerifyPhoneCode',
  component: VerifyPhoneCode,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: VerifyPhoneCodeProps) => {
  return (
    <>
      <VerifyPhoneCode {...args} />
    </>
  )
}

export const Default = {
  render: (args: VerifyPhoneCodeProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies VerifyPhoneCodeProps
// }
