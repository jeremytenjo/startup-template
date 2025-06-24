//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import FormFieldError, { type FormFieldErrorProps } from '@useweb/ui/FormFieldError'

const defaultArgs: FormFieldErrorProps = {
  errorMessage: 'Error message',
}

export default {
  title: 'lib/components/useweb/FormFieldError',
  component: FormFieldError,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: FormFieldErrorProps) => {
  return (
    <>
      <FormFieldError {...args} />
    </>
  )
}

export const Default = {
  render: (args: FormFieldErrorProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies FormFieldErrorProps
// }
