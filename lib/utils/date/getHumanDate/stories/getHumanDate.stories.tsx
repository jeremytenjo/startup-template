//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getHumanDate, {
  type GetHumanDateProps,
  type GetHumanDateReturn,
} from '../getHumanDate.js'

const defaultArgs: GetHumanDateProps = {
  date: new Date(),
}

export default {
  title: 'lib/utils/date/GetHumanDate',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  const fn = async (triggerProps = {}) => {
    return getHumanDate({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<GetHumanDateReturn, GetHumanDateProps> fn={fn} autoExec />
    </>
  )
}

export const Default = {
  render: (args: GetHumanDateProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies GetHumanDateProps
// }
