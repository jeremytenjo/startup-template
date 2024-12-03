//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import InfoDisclaimer, { type InfoDisclaimerProps } from '../InfoDisclaimer.js'

const defaultArgs: InfoDisclaimerProps = {
  id: 'InfoDisclaimer',
  disclaimer: 'This is a disclaimer',
}

export default {
  title: 'lib/components/dataDisplay/Info Disclaimer',
  component: InfoDisclaimer,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: InfoDisclaimerProps) => {
  return (
    <>
      <InfoDisclaimer {...args} />
    </>
  )
}

export const Default = {
  render: (args: InfoDisclaimerProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies InfoDisclaimerProps
// }
