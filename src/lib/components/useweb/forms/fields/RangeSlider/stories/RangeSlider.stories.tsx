//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import RangeSlider, { type RangeSliderProps } from '@useweb/ui/RangeSlider'

const defaultArgs: RangeSliderProps<any> = {
  minName: 'min',
  maxName: 'max',
  min: 1,
  max: 200,
}

export default {
  title: 'lib/components/useweb/RangeSlider',
  component: RangeSlider,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: RangeSliderProps<any>) => {
  return (
    <>
      <RangeSlider {...(args as any)} />
    </>
  )
}

export const Default = {
  render: (args: RangeSliderProps<any>) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies RangeSliderProps<any>
// }
