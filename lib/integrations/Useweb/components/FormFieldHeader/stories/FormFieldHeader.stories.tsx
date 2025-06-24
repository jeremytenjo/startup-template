//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import FormFieldHeader, { type FormFieldHeaderProps } from '@useweb/ui/FormFieldHeader'

const defaultArgs: FormFieldHeaderProps = {
  label: 'FormFieldHeader',
}

export default {
  title: 'lib/components/useweb/FormFieldHeader',
  component: FormFieldHeader,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: FormFieldHeaderProps) => {
  return (
    <>
      <FormFieldHeader {...args} />
    </>
  )
}

export const Default = {
  render: (args: FormFieldHeaderProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies FormFieldHeaderProps
// }
