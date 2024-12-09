import assert from '@useweb/assert'
import type Stripe from 'stripe'

import getStripe from '../../../lib/integrations/Stripe/utils/getStripe/getStripe.js'

export type GetConnectedAccountProps = {
  connectedAccountId: string
}

export type GetConnectedAccountReturn = {
  connectedAccount: Stripe.Response<Stripe.Account>
  id: string
}

export default async function getConnectedAccount(
  props: GetConnectedAccountProps,
): Promise<GetConnectedAccountReturn> {
  assert<GetConnectedAccountProps>({ props, requiredProps: ['connectedAccountId'] })

  const { stripe } = getStripe()

  const connectedAccount = await stripe.accounts.retrieve(props.connectedAccountId)

  return {
    id: props.connectedAccountId,
    connectedAccount,
  }
}
