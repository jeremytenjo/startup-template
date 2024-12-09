import assert from '@useweb/assert'
import type { CallableRequest } from 'firebase-functions/v2/https'
import logger from 'firebase-functions/logger'
import type Stripe from 'stripe'

import getStripe from '../../../../../../src/lib/integrations/Stripe/utils/getStripe/getStripe.js'

export const routeId = 'routes/deleteStripeAccount'

export type API_DeleteStripeAccountProps = {
  route: typeof routeId
  authUser: CallableRequest['auth']
  payload: {
    connectedAccountId: string
  }
  return: Awaited<DeleteStripeAccountReturn>
}

export type DeleteStripeAccountPropsInternal = Omit<
  API_DeleteStripeAccountProps,
  'route' | 'return'
>

export default async function deleteStripeAccount(
  props: DeleteStripeAccountPropsInternal,
): DeleteStripeAccountReturn {
  logger.info(`START: ${routeId}`, { props })

  assert<DeleteStripeAccountPropsInternal>({
    props,
    requiredProps: ['payload'],
  })
  assert<API_DeleteStripeAccountProps['payload']>({
    props: props.payload,
    requiredProps: ['connectedAccountId'],
  })

  const { stripe } = getStripe()

  const stripeRes = await stripe.accounts.del(props.payload.connectedAccountId)

  const response: Awaited<DeleteStripeAccountReturn> = {
    data: [{ stripeRes }],
  }

  logger.info(`END: ${routeId}`, { response })

  return response
}

export type DeleteStripeAccountReturn = Promise<{
  data: {
    stripeRes: Stripe.Response<Stripe.DeletedAccount>
  }[]
}>
