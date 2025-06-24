//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import FileInput, { type FileInputProps } from '@useweb/ui/FileInput'

const defaultArgs: FileInputProps<any> = {
  name: 'FileInput',
}

export default {
  title: 'lib/components/useweb/FileInput',
  component: FileInput,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: FileInputProps<any>) => {
  return (
    <>
      <FileInput<any> {...args} />
    </>
  )
}

export const Default = {
  render: (args: FileInputProps<any>) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies FileInputProps
// }
