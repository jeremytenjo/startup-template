//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import Checkbox, { type CheckboxProps } from '@useweb/ui/Checkbox'

const defaultArgs: CheckboxProps<any> = {
  name: 'Checkbox',
}

export default {
  title: 'lib/components/useweb/Checkbox',
  component: Checkbox,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: CheckboxProps<any>) => {
  return (
    <>
      <Checkbox name='Checkbox' />
    </>
  )
}

export const Default = {
  render: (args: CheckboxProps<any>) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies CheckboxProps<any>
// }
