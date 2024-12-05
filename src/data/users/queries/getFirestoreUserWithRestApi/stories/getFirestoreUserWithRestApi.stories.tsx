//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getFirestoreUserWithRestApi, {
  type GetFirestoreUserWithRestApiProps,
  type GetFirestoreUserWithRestApiReturn,
} from '../getFirestoreUserWithRestApi.js'

const defaultArgs: GetFirestoreUserWithRestApiProps = {
  username: 'PMdamiann',
}

export default {
  title: 'data/users/queries/GetFirestoreUserWithRestApi',

  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: GetFirestoreUserWithRestApiProps) => {
  const fn = async (triggerProps = {}) => {
    return await getFirestoreUserWithRestApi({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<GetFirestoreUserWithRestApiReturn, GetFirestoreUserWithRestApiProps>
        fn={fn}
        autoExec
      />
    </>
  )
}

export const Default = {
  render: (args: GetFirestoreUserWithRestApiProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies GetFirestoreUserWithRestApiProps
// }
