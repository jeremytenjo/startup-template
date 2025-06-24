//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getSocialAccountProfilePhoto, {
  type GetSocialAccountProfilePhotoProps,
  type GetSocialAccountProfilePhotoReturn,
} from '../getSocialAccountProfilePhoto.js'

export default {
  title: 'lib/utils/socials/GetSocialAccountProfilePhoto',
  args: {
    profileUrl: 'https://freshcut.gg/@user2489289',
  },
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: any) => {
  const fn = async () => {
    const html = await fetch(args.profileUrl).then((res) => {return res.text()})

    console.log(html)
    return getSocialAccountProfilePhoto({ html })
  }

  return (
    <>
      <AsyncTester<GetSocialAccountProfilePhotoReturn, GetSocialAccountProfilePhotoProps>
        fn={fn}
        autoExec
        resultComponent={({ result }) => {
          // eslint-disable-next-line @next/next/no-img-element
          return <img src={result.platformPhotoUrl} alt='alt' />
        }}
      />
    </>
  )
}

export const Default = {
  render: (args: GetSocialAccountProfilePhotoProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies GetSocialAccountProfilePhotoProps
// }
