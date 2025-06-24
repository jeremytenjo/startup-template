//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import StatusLabel, { type StatusLabelProps } from '../StatusLabel.js'

const defaultArgs: StatusLabelProps = {
  type: 'success',
  title: 'Success',
}

export default {
  title: 'lib/components/dataDisplay/StatusLabel',
  component: StatusLabel,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: StatusLabelProps) => {
  return (
    <>
      <StatusLabel {...args} />
    </>
  )
}

export const Default = {
  render: (args: StatusLabelProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies StatusLabelProps
// }
