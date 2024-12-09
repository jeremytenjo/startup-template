import assert from '@useweb/assert'
import type { CallableRequest } from 'firebase-functions/v2/https'
import logger from 'firebase-functions/logger'
import type Stripe from 'stripe'

import getStripe from '../../../../../../src/lib/integrations/Stripe/utils/getStripe/getStripe.js'

export const routeId = 'routes/getConnectedAccount'

export type API_GetConnectedAccountProps = {
  route: typeof routeId
  authUser: CallableRequest['auth']
  payload: {
    connectedAccountId: string
  }
  return: Awaited<GetConnectedAccountReturn>
}

export type GetConnectedAccountPropsInternal = Omit<
  API_GetConnectedAccountProps,
  'route' | 'return'
>

export default async function getConnectedAccount(
  props: GetConnectedAccountPropsInternal,
): GetConnectedAccountReturn {
  logger.info(`START: ${routeId}`, { props })

  assert<GetConnectedAccountPropsInternal>({
    props,
    requiredProps: ['payload'],
  })
  assert<API_GetConnectedAccountProps['payload']>({
    props: props.payload,
    requiredProps: ['connectedAccountId'],
  })

  const { stripe } = getStripe()

  const connectedAccount = await stripe.accounts.retrieve(
    props.payload.connectedAccountId,
  )

  const response: Awaited<GetConnectedAccountReturn> = {
    data: [
      {
        id: props.payload.connectedAccountId,
        connectedAccount,
      },
    ],
  }

  logger.info(`END: ${routeId}`, { response })

  return response
}

export type GetConnectedAccountReturn = Promise<{
  data: {
    id: string
    connectedAccount: Stripe.Response<Stripe.Account>
  }[]
}>
