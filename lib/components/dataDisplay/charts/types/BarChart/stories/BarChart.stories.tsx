//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import BarChart, { type BarChartProps } from '../BarChart.js'

const defaultArgs: BarChartProps = {
  data: [],
  loading: false,
}

export default {
  title: 'lib/components/dataDisplay/charts/types/BarChart',
  component: BarChart,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: BarChartProps) => {
  return (
    <>
      <BarChart {...args} />
    </>
  )
}

export const Default = {
  render: (args: BarChartProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies BarChartProps
// }
