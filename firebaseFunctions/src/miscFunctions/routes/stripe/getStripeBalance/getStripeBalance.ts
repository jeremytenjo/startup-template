import assert from '@useweb/assert'
import type { CallableRequest } from 'firebase-functions/v2/https'
import logger from 'firebase-functions/logger'

export const routeId = 'routes/getStripeBalance'

export type API_GetStripeBalanceProps = {
  route: typeof routeId
  authUser: CallableRequest['auth']
  payload: {
    name: string
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
    requiredProps: ['name'],
  })

  const response: Awaited<GetStripeBalanceReturn> = {
    data: [{ success: true }],
  }

  logger.info(`END: ${routeId}`, { response })

  return response
}

export type GetStripeBalanceReturn = Promise<{
  data: {
    success: boolean
  }[]
}>
