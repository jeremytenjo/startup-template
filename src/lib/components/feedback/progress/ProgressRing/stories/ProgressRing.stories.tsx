//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import ProgressRing, { type ProgressRingProps } from '../ProgressRing.js'

const defaultArgs: ProgressRingProps = {
  progress: 50,
  strokeColor: '#494028',
}

export default {
  title: 'lib/components/feedback/progress/ProgressRing',
  component: ProgressRing,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: ProgressRingProps) => {
  return (
    <>
      <ProgressRing {...args} />
    </>
  )
}

export const Default = {
  render: (args: ProgressRingProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies ProgressRingProps
// }
