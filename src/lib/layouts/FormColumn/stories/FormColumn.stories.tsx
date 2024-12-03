//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import FormColumn, { type FormColumnProps } from '../FormColumn.js'

const defaultArgs: FormColumnProps = {
  title: 'Add Game',
  children: <div>Form</div>,
}

export default {
  title: 'lib/layouts/Form Column',
  component: FormColumn,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: FormColumnProps) => {
  return (
    <>
      <FormColumn {...args} />
    </>
  )
}

export const Default = {
  render: (args: FormColumnProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies FormColumnProps
// }
