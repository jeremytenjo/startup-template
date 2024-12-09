import assert from '@useweb/assert'
import type { CallableRequest } from 'firebase-functions/v2/https'
import logger from 'firebase-functions/logger'
import type Stripe from 'stripe'

import getStripe from '../../../../../../src/lib/integrations/Stripe/utils/getStripe/getStripe.js'

export const routeId = 'routes/getStripeConnectedAccountDashboardLink'

export type API_GetStripeConnectedAccountDashboardLinkProps = {
  route: typeof routeId
  authUser: CallableRequest['auth']
  payload: {
    connectedAccountId: string
  }
  return: Awaited<GetStripeConnectedAccountDashboardLinkReturn>
}

export type GetStripeConnectedAccountDashboardLinkPropsInternal = Omit<
  API_GetStripeConnectedAccountDashboardLinkProps,
  'route' | 'return'
>

export default async function getStripeConnectedAccountDashboardLink(
  props: GetStripeConnectedAccountDashboardLinkPropsInternal,
): GetStripeConnectedAccountDashboardLinkReturn {
  logger.info(`START: ${routeId}`, { props })

  assert<GetStripeConnectedAccountDashboardLinkPropsInternal>({
    props,
    requiredProps: ['payload'],
  })
  assert<API_GetStripeConnectedAccountDashboardLinkProps['payload']>({
    props: props.payload,
    requiredProps: ['connectedAccountId'],
  })

  const { stripe } = getStripe()

  const dashboardLink = await stripe.accounts.createLoginLink(
    props.payload.connectedAccountId,
  )

  if (!dashboardLink?.url) {
    throw new Error('dashboardLink?.url is undefined')
  }

  const response: Awaited<GetStripeConnectedAccountDashboardLinkReturn> = {
    data: [
      {
        id: props.payload.connectedAccountId,
        dashboardLink,
      },
    ],
  }

  logger.info(`END: ${routeId}`, { response })

  return response
}

export type GetStripeConnectedAccountDashboardLinkReturn = Promise<{
  data: {
    id: string
    dashboardLink: Stripe.Response<Stripe.LoginLink>
  }[]
}>
