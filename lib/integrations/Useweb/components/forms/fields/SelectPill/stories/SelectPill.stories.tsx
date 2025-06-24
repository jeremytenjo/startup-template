//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import SelectPill, { type SelectPillProps } from '@useweb/ui/SelectPill'

const defaultArgs: SelectPillProps<any> = {
  name: 'SelectPill',
  options: [
    {
      label: 'Option 1',
      value: 'option1',
    },
    {
      label: 'Option 2',
      value: 'option2',
    },
    {
      label: 'Option 3',
      value: 'option3',
    },
  ],
  label: 'Select Pill',
}

export default {
  title: 'lib/components/useweb/forms/fields/SelectPill',
  component: SelectPill,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: SelectPillProps<any>) => {
  return (
    <>
      <SelectPill {...(args as any)} />
    </>
  )
}

export const Default = {
  render: (args: SelectPillProps<any>) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies SelectPillProps<any>
// }
