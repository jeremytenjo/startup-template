//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import PageTitleHeading, { type PageTitleHeadingProps } from '../PageTitleHeading.js'

const defaultArgs: PageTitleHeadingProps = {
  title: 'Sponsorships',
  subTitle:
    'Each day new developers search for creators to collaborate with. We’ll make sure they find you soon.',
}

export default {
  title: 'lib/layouts/Page Title Heading',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: PageTitleHeadingProps) => {
  return (
    <>
      <PageTitleHeading {...args} />
    </>
  )
}

export const Default = {
  render: (args: PageTitleHeadingProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies PageTitleHeadingProps
// }
