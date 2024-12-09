import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  StripeBalanceCardUi,
  type StripeBalanceCardUiProps,
} from '../StripeBalanceCard.js'
import userStubs from '../../../../../../../../../../../../../src/data/users/users.stubs.js'

const defaultArgs: StripeBalanceCardUiProps = {
  loading: false,
  error: false,
  user: userStubs[0],
}

const meta: Meta<typeof StripeBalanceCardUi> = {
  title:
    'lib/integrations/Stripe/ui/CreateConnectedAccountCard/containers/StripeAccountActiveCard/containers/StripeBalanceCard/StripeBalanceCardUi',
  component: StripeBalanceCardUi,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}
export default meta

type Story = StoryObj<typeof StripeBalanceCardUi>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: StripeBalanceCardUiProps) => {
  return (
    <>
      <StripeBalanceCardUi {...args} />
    </>
  )
}

export const Default: Story = {
  render: (args: StripeBalanceCardUiProps) => {
    return <Template {...args} />
  },
}

export const Loading: Story = {
  render: (args: StripeBalanceCardUiProps) => {
    return <Template {...args} />
  },
  args: {
    loading: true,
  },
}

export const Error: Story = {
  render: (args: StripeBalanceCardUiProps) => {
    return <Template {...args} />
  },
  args: {
    error: 'Error',
  },
}
