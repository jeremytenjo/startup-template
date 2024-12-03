//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getTiktokUserAverageViews, {
  type GetTiktokUserAverageViewsProps,
  type GetTiktokUserAverageViewsReturn,
} from '../getTiktokUserAverageViews.js'
import ensambleDateTiktokGetUserPosts from '../../../ensambleDateTiktokGetUserPosts.js'

export default {
  title:
    'lib/integrations/EnsembleData/socials/tiktok/ensambleDateTiktokGetUserPosts/utils/GetTiktokUserAverageViews',
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: GetTiktokUserAverageViewsProps) => {
  const fn = async () => {
    const ensambleDateTiktokGetUserPostsReturn = await ensambleDateTiktokGetUserPosts({
      username: 'aldowita',
    })

    return getTiktokUserAverageViews({ ensambleDateTiktokGetUserPostsReturn })
  }

  return (
    <>
      <AsyncTester<GetTiktokUserAverageViewsReturn, GetTiktokUserAverageViewsProps>
        fn={fn}
      />
    </>
  )
}

export const Default = {
  render: (args: GetTiktokUserAverageViewsProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies GetTiktokUserAverageViewsProps
// }
