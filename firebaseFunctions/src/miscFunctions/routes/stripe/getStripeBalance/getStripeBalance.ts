import assert from '@useweb/assert'
import type { CallableRequest } from 'firebase-functions/v2/https'
import logger from 'firebase-functions/logger'
import type Stripe from 'stripe'

import getStripe from '../../../../../../src/lib/integrations/Stripe/utils/getStripe/getStripe.js'

export const routeId = 'routes/getStripeBalance'

export type API_GetStripeBalanceProps = {
  route: typeof routeId
  authUser: CallableRequest['auth']
  payload: {
    connectedAccountId: string
  }
  return: Awaited<GetStripeBalanceReturn>
}

export type GetStripeBalancePropsInternal = Omit<
  API_GetStripeBalanceProps,
  'route' | 'return'
>

export default async function getStripeBalance(
  props: GetStripeBalancePropsInternal,
): GetStripeBalanceReturn {
  logger.info(`START: ${routeId}`, { props })

  assert<GetStripeBalancePropsInternal>({
    props,
    requiredProps: ['payload'],
  })
  assert<API_GetStripeBalanceProps['payload']>({
    props: props.payload,
    requiredProps: ['connectedAccountId'],
  })

  const { stripe } = getStripe()

  const balance = await stripe.balance.retrieve({
    stripeAccount: props.payload.connectedAccountId,
  })

  const response: Awaited<GetStripeBalanceReturn> = {
    data: [{ id: props.payload.connectedAccountId, balance }],
  }

  logger.info(`END: ${routeId}`, { response })

  return response
}

export type GetStripeBalanceReturn = Promise<{
  data: {
    balance: Stripe.Response<Stripe.Balance>
    id: string
  }[]
}>
