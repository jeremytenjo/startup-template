//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import AgreeCheckbox, { type AgreeCheckboxProps } from '../AgreeCheckbox.js'

const defaultArgs: AgreeCheckboxProps<any> = {
  name: 'AgreeCheckbox',
  label: 'Agree Checkbox',
  title: 'Agree Checkbox',
  triggerLabel: 'Agree Checkbox',
  dialogContent: 'Agree Checkbox',
  loading: false,
  error: undefined,
}

export default {
  title: 'lib/components/dataDisplay/AgreeCheckbox',
  component: AgreeCheckbox,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: AgreeCheckboxProps<any>) => {
  return (
    <>
      <AgreeCheckbox<any> {...args} />
    </>
  )
}

export const Default = {
  render: (args: AgreeCheckboxProps<any>) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies AgreeCheckboxProps<any>
// }
