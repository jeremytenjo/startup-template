//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import formatDateToHumanReadable, {
  type FormatDateToHumanReadableProps,
  type FormatDateToHumanReadableReturn,
} from '../formatDateToHumanReadable.js'

const defaultArgs: FormatDateToHumanReadableProps = {
  date: new Date(),
}

export default {
  title: 'lib/utils/date/FormatDateToHumanReadable',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: typeof defaultArgs) => {
  const fn = async (triggerProps = {}) => {
    return formatDateToHumanReadable({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<FormatDateToHumanReadableReturn, FormatDateToHumanReadableProps>
        fn={fn}
        autoExec
      />
    </>
  )
}

export const Default = {
  render: (args: FormatDateToHumanReadableProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies FormatDateToHumanReadableProps
// }
