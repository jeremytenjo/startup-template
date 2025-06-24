//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import PhoneInput, { type PhoneInputProps } from '@useweb/ui/PhoneInput'

const defaultArgs: PhoneInputProps<any> = {
  name: 'PhoneInput',
}

export default {
  title: 'lib/components/useweb/PhoneInput',
  component: PhoneInput,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: PhoneInputProps<any>) => {
  return (
    <>
      <PhoneInput {...(args as any)} />
    </>
  )
}

export const Default = {
  render: (args: PhoneInputProps<any>) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies PhoneInputProps<any>
// }
