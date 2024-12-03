//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import ChartWrapper, { type ChartWrapperProps } from '../ChartWrapper.js'

const defaultArgs: ChartWrapperProps = {
  children: 'ChartWrapper',
  title: 'Active Users',
  filters: [
    {
      dayInterval: '12h',
      onClick: () => {},
      active: true,
    },
    {
      dayInterval: '24h',
      onClick: () => {},
      active: false,
    },
    {
      dayInterval: '7 days',
      onClick: () => {},
      active: false,
    },
  ],
}

export default {
  title: 'lib/components/dataDisplay/charts/ChartWrapper',
  component: ChartWrapper,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: ChartWrapperProps) => {
  return (
    <>
      <ChartWrapper {...args} />
    </>
  )
}

export const Default = {
  render: (args: ChartWrapperProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies ChartWrapperProps
// }
