//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import ensambleDateTiktokGetUserPosts, {
  type EnsambleDateTiktokGetUserPostsProps,
  type EnsambleDateTiktokGetUserPostsReturn,
} from '../ensambleDateTiktokGetUserPosts.js'

const defaultArgs: EnsambleDateTiktokGetUserPostsProps = {
  username: '1coal',
}

export default {
  title: 'lib/integrations/EnsembleData/socials/tiktok/EnsambleDateTiktokGetUserPosts',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: EnsambleDateTiktokGetUserPostsProps) => {
  const fn = async (triggerProps = {}) => {
    return await ensambleDateTiktokGetUserPosts({ ...args, ...triggerProps })
  }

  return (
    <>
      <AsyncTester<
        EnsambleDateTiktokGetUserPostsReturn,
        EnsambleDateTiktokGetUserPostsProps
      >
        fn={fn}
      />
    </>
  )
}

export const Default = {
  render: (args: EnsambleDateTiktokGetUserPostsProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies EnsambleDateTiktokGetUserPostsProps
// }
