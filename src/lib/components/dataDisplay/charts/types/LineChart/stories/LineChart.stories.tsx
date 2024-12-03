//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import LineChart, { type LineChartProps } from '../LineChart.js'

const defaultArgs: LineChartProps = {
  data: [],
  loading: false,
}

export default {
  title: 'lib/components/dataDisplay/charts/types/LineChart',
  component: LineChart,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: LineChartProps) => {
  return (
    <>
      <LineChart {...args} />
    </>
  )
}

export const Default = {
  render: (args: LineChartProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies LineChartProps
// }
