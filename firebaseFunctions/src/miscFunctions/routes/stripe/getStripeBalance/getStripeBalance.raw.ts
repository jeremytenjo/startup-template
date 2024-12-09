import assert from '@useweb/assert'
import type Stripe from 'stripe'

import getStripe from '../../../lib/integrations/Stripe/utils/getStripe/getStripe.js'

export type GetStripeBalanceProps = {
  connectedAccountId: string
}

export type GetStripeBalanceReturn = {
  balance: Stripe.Response<Stripe.Balance>
  id: string
}

export default async function getStripeBalance(
  props: GetStripeBalanceProps,
): Promise<GetStripeBalanceReturn> {
  assert<GetStripeBalanceProps>({ props, requiredProps: ['connectedAccountId'] })

  const { stripe } = getStripe()

  const balance = await stripe.balance.retrieve({
    stripeAccount: props.connectedAccountId,
  })

  return {
    balance,
    id: props.connectedAccountId,
  }
}
