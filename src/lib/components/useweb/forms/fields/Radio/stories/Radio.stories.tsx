//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import Radio, { type RadioProps } from '@useweb/ui/Radio'

type FormSchema = {
  bob: string
}

const defaultArgs: RadioProps<FormSchema> = {
  name: 'bob',
}

export default {
  title: 'lib/components/useweb/forms/fields/Radio',
  component: Radio,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: RadioProps<FormSchema>) => {
  return (
    <>
      <Radio {...args} />
    </>
  )
}

export const Default = {
  render: (args: RadioProps<FormSchema>) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies RadioProps<FormSchema>
// }
