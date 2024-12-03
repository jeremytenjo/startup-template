//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import testFIrestoreUpdate, {
  type TestFIrestoreUpdateProps,
  type TestFIrestoreUpdateReturn,
} from '../testFIrestoreUpdate.js'

const defaultArgs: TestFIrestoreUpdateProps = {
  name: 'testFIrestoreUpdate',
}

export default {
  title: 'lib/integrations/Google/Firebase/firestore/tests/TestFIrestoreUpdate',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: TestFIrestoreUpdateProps) => {
  const fn = async (triggerProps = {}) => {
    return await testFIrestoreUpdate({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<TestFIrestoreUpdateReturn, TestFIrestoreUpdateProps>
        fn={fn}
        autoExec
      />
    </>
  )
}

export const Default = {
  render: (args: TestFIrestoreUpdateProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies TestFIrestoreUpdateProps
// }
