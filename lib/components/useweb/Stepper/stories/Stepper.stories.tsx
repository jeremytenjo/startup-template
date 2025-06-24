//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import Stepper, { type StepperProps } from '@useweb/ui/Stepper'

const defaultArgs: StepperProps = {
  steps: [
    {
      id: '1',
      content: 'Step 1',
    },
    {
      id: '2',
      content: 'Step 2',
    },
  ],
  activeStep: 0,
}

export default {
  title: 'lib/components/useweb/Stepper',
  component: Stepper,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: StepperProps) => {
  return (
    <>
      <Stepper {...args} />
    </>
  )
}

export const Default = {
  render: (args: StepperProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies StepperProps
// }
