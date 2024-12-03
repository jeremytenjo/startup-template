//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getTiktokUserSubscriberCount, {
  type GetTiktokUserSubscriberCountProps,
  type GetTiktokUserSubscriberCountReturn,
} from '../getTiktokUserSubscriberCount.js'
import ensambleDateTiktokGetUserPosts from '../../../ensambleDateTiktokGetUserPosts.js'

export default {
  title:
    'lib/integrations/EnsembleData/socials/tiktok/ensambleDateTiktokGetUserPosts/utils/GetTiktokUserSubscriberCount',
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: GetTiktokUserSubscriberCountProps) => {
  const fn = async () => {
    const ensambleDateTiktokGetUserPostsReturn = await ensambleDateTiktokGetUserPosts({
      username: '1coal',
    })

    return getTiktokUserSubscriberCount({
      ensambleDateTiktokGetUserPostsReturn,
    })
  }

  return (
    <>
      <AsyncTester<GetTiktokUserSubscriberCountReturn, GetTiktokUserSubscriberCountProps>
        fn={fn}
        autoExec
      />
    </>
  )
}

export const Default = {
  render: (args: GetTiktokUserSubscriberCountProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies GetTiktokUserSubscriberCountProps
// }
