//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import ChartBase, { type ChartBaseProps } from '../ChartBase.js'

const defaultArgs: ChartBaseProps = {
  config: {
    type: 'line',
    data: {
      datasets: [],
    },
  },
  loading: false,
}

export default {
  title: 'lib/components/dataDisplay/charts/ChartBase',
  component: ChartBase,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: ChartBaseProps) => {
  return (
    <>
      <ChartBase {...args} />
    </>
  )
}

export const Default = {
  render: (args: ChartBaseProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies ChartBaseProps
// }
