//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import StripeAccountActiveCard from '../StripeAccountActiveCard.js'

const defaultArgs: any = {
  name: 'StripeAccountActiveCard',
}

export default {
  title:
    'lib/integrations/Stripe/ui/CreateConnectedAccountCard/containers/StripeAccountActiveCard',
  component: StripeAccountActiveCard,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: any) => {
  return (
    <>
      <StripeAccountActiveCard {...args} />
    </>
  )
}

export const Default = {
  render: (args: any) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies any
// }
