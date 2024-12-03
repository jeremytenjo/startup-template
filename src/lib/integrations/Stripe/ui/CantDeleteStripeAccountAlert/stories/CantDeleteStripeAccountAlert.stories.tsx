//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import CantDeleteStripeAccountAlert, {
  type CantDeleteStripeAccountAlertProps,
} from '../CantDeleteStripeAccountAlert.js'

const defaultArgs: CantDeleteStripeAccountAlertProps = {
  availableBalanceCents: {
    amount: 100,
    currency: 'usd',
  },
  pendingBalanceCents: {
    amount: 100,
    currency: 'usd',
  },
}

export default {
  title: 'lib/integrations/Stripe/ui/CantDeleteStripeAccountAlert',
  component: CantDeleteStripeAccountAlert,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: CantDeleteStripeAccountAlertProps) => {
  return (
    <>
      <CantDeleteStripeAccountAlert {...args} />
    </>
  )
}

export const Default = {
  render: (args: CantDeleteStripeAccountAlertProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies CantDeleteStripeAccountAlertProps
// }
