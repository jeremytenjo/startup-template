//https://storybook.js.org/docs/react/writing-docs/docs-page
// https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
import React from 'react'

import CreateConnectedAccountCard, {
  type CreateConnectedAccountCardProps,
} from '../CreateConnectedAccountCard.js'
import userStubs from '../../../../../../data/users/users.stubs.js'
import type UserSchema from '../../../../../../data/users/user.schema.js'

const defaultArgs: CreateConnectedAccountCardProps = {
  createStripeAccountSubTitle: 'Create a Stripe account',
  userToCreateAccount: userStubs.find(
    (user) => user?.accountType === 'creator',
  ) as UserSchema,
}

export default {
  title: 'lib/integrations/Stripe/ui/CreateConnectedAccountCard',
  component: CreateConnectedAccountCard,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: CreateConnectedAccountCardProps) => {
  return (
    <>
      <CreateConnectedAccountCard {...args} />
    </>
  )
}

export const Default = {
  render: (args: CreateConnectedAccountCardProps) => {
    return <Template {...args} />
  },
}

// export const Variant = {
//  ...Default,
//  args: {
//  ...defaultArgs,
// } satisfies CreateConnectedAccountCardProps
// }
