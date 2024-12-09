import assert from '@useweb/assert'
import type { CallableRequest } from 'firebase-functions/v2/https'
import logger from 'firebase-functions/logger'

export const routeId = 'routes/getStripeConnectedAccountDashboardLink'

export type API_GetStripeConnectedAccountDashboardLinkProps = {
  route: typeof routeId
  authUser: CallableRequest['auth']
  payload: {
    name: string
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
    requiredProps: ['name'],
  })

  const response: Awaited<GetStripeConnectedAccountDashboardLinkReturn> = {
    data: [{ success: true }],
  }

  logger.info(`END: ${routeId}`, { response })

  return response
}

export type GetStripeConnectedAccountDashboardLinkReturn = Promise<{
  data: {
    success: boolean
  }[]
}>
