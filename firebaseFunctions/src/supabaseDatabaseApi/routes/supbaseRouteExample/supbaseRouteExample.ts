import assert from '@useweb/assert'
import type { CallableRequest } from 'firebase-functions/v2/https'
import logger from 'firebase-functions/logger'

export const routeId = 'routes/supbaseRouteExample'

export type API_SupbaseRouteExampleProps = {
  route: typeof routeId
  authUser: CallableRequest['auth']
  payload: {
    name: string
  }
  return: Awaited<SupbaseRouteExampleReturn>
}

export type SupbaseRouteExamplePropsInternal = Omit<
  API_SupbaseRouteExampleProps,
  'route' | 'return'
>

export default async function supbaseRouteExample(
  props: SupbaseRouteExamplePropsInternal,
): SupbaseRouteExampleReturn {
  logger.info(`START: ${routeId}`, { props })

  assert<SupbaseRouteExamplePropsInternal>({
    props,
    requiredProps: ['payload'],
  })
  assert<API_SupbaseRouteExampleProps['payload']>({
    props: props.payload,
    requiredProps: ['name'],
  })

  const response: Awaited<SupbaseRouteExampleReturn> = {
    data: [{ id: props.payload.name, success: true }],
  }

  logger.info(`END: ${routeId}`, { response })

  return response
}

export type SupbaseRouteExampleReturn = Promise<{
  data: {
    id: string
    success: boolean
  }[]
}>
