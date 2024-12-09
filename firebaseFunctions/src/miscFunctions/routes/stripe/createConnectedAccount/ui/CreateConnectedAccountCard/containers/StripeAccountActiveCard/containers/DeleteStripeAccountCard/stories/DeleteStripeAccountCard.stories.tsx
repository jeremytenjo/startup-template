import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import {
  DeleteStripeAccountCardUi,
  type DeleteStripeAccountCardUiProps,
} from '../DeleteStripeAccountCard.js'

const defaultArgs: DeleteStripeAccountCardUiProps = {
  data: 'DeleteStripeAccountCard',
  loading: false,
  error: false,
}

const meta: Meta<typeof DeleteStripeAccountCardUi> = {
  title:
    'lib/integrations/Stripe/ui/CreateConnectedAccountCard/containers/StripeAccountActiveCard/containers/DeleteStripeAccountCard/DeleteStripeAccountCardUi',
  component: DeleteStripeAccountCardUi,
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}
export default meta

type Story = StoryObj<typeof DeleteStripeAccountCardUi>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template = (args: DeleteStripeAccountCardUiProps) => {
  return (
    <>
      <DeleteStripeAccountCardUi {...args} />
    </>
  )
}

export const Default: Story = {
  render: (args: DeleteStripeAccountCardUiProps) => {
    return <Template {...args} />
  },
}

export const Loading: Story = {
  render: (args: DeleteStripeAccountCardUiProps) => {
    return <Template {...args} />
  },
  args: {
    loading: true,
  },
}

export const Error: Story = {
  render: (args: DeleteStripeAccountCardUiProps) => {
    return <Template {...args} />
  },
  args: {
    error: 'Error',
  },
}
