import assert from '@useweb/assert'
import type Stripe from 'stripe'

import getStripe from '../../../lib/integrations/Stripe/utils/getStripe/getStripe.js'

export type DeleteStripeAccountProps = {
  connectedAccountId: string
}

export type DeleteStripeAccountReturn = {
  stripeRes: Stripe.Response<Stripe.DeletedAccount>
}

export default async function deleteStripeAccount(
  props: DeleteStripeAccountProps,
): Promise<DeleteStripeAccountReturn> {
  assert<DeleteStripeAccountProps>({ props, requiredProps: ['connectedAccountId'] })

  const { stripe } = getStripe()

  const stripeRes = await stripe.accounts.del(props.connectedAccountId)

  return {
    stripeRes,
  }
}
