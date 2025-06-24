//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'
import Image from '@useweb/ui/Image'
import Box from '@useweb/ui/Box'

import Banner, { type BannerProps } from '../Banner.js'

const defaultArgs: BannerProps = {
  ['data-id']: 'Banner',
  left: {
    title: {
      title: 'Still have questions?',
      subTitle:
        'Can’t find the answer you’re looking for? Please chat to our friendly team.',
    },
    link: {
      href: `/faq#`,
      label: 'Get in touch',
    },
  },
  right: {
    content: (
      <>
        <Image
          src={`/images/largeIcons/big-messages.svg`}
          alt={`suport icon`}
          width={346}
          height={296}
          sx={{
            position: 'absolute',
            zIndex: '1',
            width: [, '200px', '250px'],
            top: -150,
            bottom: 0,
            right: [, 10, 150],
            display: ['none', 'block'],
          }}
        />
        <Box
          data-id='Background'
          sx={{
            borderRadius: '346px',
            background: 'linear-gradient(180deg, #BE8594 0%, #246D97 100%)',
            filter: 'blur(100px)',
            width: '346px',
            height: '236px',
            flexShrink: '0',
            position: 'absolute',
            top: '-60px',
            right: 100,
            bottom: 200,
          }}
        ></Box>
      </>
    ),
  },
}

export default {
  title: 'lib/components/dataDisplay/Banner',
  component: Banner,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: BannerProps) => {
  return (
    <>
      <Banner {...args} />
    </>
  )
}

export const Default = {
  render: (args: BannerProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies BannerProps
// }
