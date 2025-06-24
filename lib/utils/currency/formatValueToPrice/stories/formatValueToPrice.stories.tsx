//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import formatValueToPrice, {
  type FormatValueToPriceProps,
  type FormatValueToPriceReturn,
} from '../formatValueToPrice.js'

const defaultArgs: FormatValueToPriceProps = {
  amountCents: 2000,
}

export default {
  title: 'lib/utils/currency/Format Value To Price',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  const fn = async (triggerProps = {}) => {
    return await formatValueToPrice({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<FormatValueToPriceReturn, FormatValueToPriceProps> fn={fn} autoExec />
    </>
  )
}

export const Default = {
  render: (args: FormatValueToPriceProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies FormatValueToPriceProps
// }
