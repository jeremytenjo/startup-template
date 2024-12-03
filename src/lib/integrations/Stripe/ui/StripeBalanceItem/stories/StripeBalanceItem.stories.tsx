//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import StripeBalanceItem, { type StripeBalanceItemProps } from '../StripeBalanceItem.js'
import AvailableBalanceIcon from '../../../../../components/icons/AvailableBalanceIcon.js'

const defaultArgs: StripeBalanceItemProps = {
  icon: <AvailableBalanceIcon />,
  title: 'Available Balance',
  amountCents: 17045,
  currency: 'USD',
  disclaimer: 'Available to transfer',
}

export default {
  title: 'lib/integrations/Stripe/ui/StripeBalanceItem',
  component: StripeBalanceItem,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: StripeBalanceItemProps) => {
  return (
    <>
      <StripeBalanceItem {...args} />
    </>
  )
}

export const Default = {
  render: (args: StripeBalanceItemProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies StripeBalanceItemProps
// }
