import assert from '@useweb/assert'
import type { CallableRequest } from 'firebase-functions/v2/https'
import logger from 'firebase-functions/logger'

export const routeId = 'routes/createConnectedAccount'

export type API_CreateConnectedAccountProps = {
  route: typeof routeId
  authUser: CallableRequest['auth']
  payload: {
    name: string
  }
  return: Awaited<CreateConnectedAccountReturn>
}

export type CreateConnectedAccountPropsInternal = Omit<
  API_CreateConnectedAccountProps,
  'route' | 'return'
>

export default async function createConnectedAccount(
  props: CreateConnectedAccountPropsInternal,
): CreateConnectedAccountReturn {
  logger.info(`START: ${routeId}`, { props })

  assert<CreateConnectedAccountPropsInternal>({
    props,
    requiredProps: ['payload'],
  })
  assert<API_CreateConnectedAccountProps['payload']>({
    props: props.payload,
    requiredProps: ['name'],
  })

  const response: Awaited<CreateConnectedAccountReturn> = {
    data: [{ success: true }],
  }

  logger.info(`END: ${routeId}`, { response })

  return response
}

export type CreateConnectedAccountReturn = Promise<{
  data: {
    success: boolean
  }[]
}>
