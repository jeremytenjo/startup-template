import assert from '@useweb/assert'
import type { CallableRequest } from 'firebase-functions/v2/https'
import logger from 'firebase-functions/logger'

export const routeId = 'routes/finishCreatingConnectedAccount'

export type API_FinishCreatingConnectedAccountProps = {
  route: typeof routeId
  authUser: CallableRequest['auth']
  payload: {
    name: string
  }
  return: Awaited<FinishCreatingConnectedAccountReturn>
}

export type FinishCreatingConnectedAccountPropsInternal = Omit<
  API_FinishCreatingConnectedAccountProps,
  'route' | 'return'
>

export default async function finishCreatingConnectedAccount(
  props: FinishCreatingConnectedAccountPropsInternal,
): FinishCreatingConnectedAccountReturn {
  logger.info(`START: ${routeId}`, { props })

  assert<FinishCreatingConnectedAccountPropsInternal>({
    props,
    requiredProps: ['payload'],
  })
  assert<API_FinishCreatingConnectedAccountProps['payload']>({
    props: props.payload,
    requiredProps: ['name'],
  })

  const response: Awaited<FinishCreatingConnectedAccountReturn> = {
    data: [{ success: true }],
  }

  logger.info(`END: ${routeId}`, { response })

  return response
}

export type FinishCreatingConnectedAccountReturn = Promise<{
  data: {
    success: boolean
  }[]
}>
