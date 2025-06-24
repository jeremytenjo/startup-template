//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import BalanceMiniCard, { type BalanceMiniCardProps } from '../BalanceMiniCard.js'

const defaultArgs: BalanceMiniCardProps = {
  title: 'Balance',
  balance: '$0.00',
  loading: false,
  link: '/settings/billing',
}

export default {
  title: 'lib/components/dataDisplay/BalanceMiniCard',
  component: BalanceMiniCard,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: BalanceMiniCardProps) => {
  return (
    <>
      <BalanceMiniCard {...args} />
    </>
  )
}

export const Default = {
  render: (args: BalanceMiniCardProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies BalanceMiniCardProps
// }
