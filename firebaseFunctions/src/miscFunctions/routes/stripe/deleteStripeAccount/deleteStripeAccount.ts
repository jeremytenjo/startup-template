import assert from '@useweb/assert'
import type { CallableRequest } from 'firebase-functions/v2/https'
import logger from 'firebase-functions/logger'

export const routeId = 'routes/deleteStripeAccount'

export type API_DeleteStripeAccountProps = {
  route: typeof routeId
  authUser: CallableRequest['auth']
  payload: {
    name: string
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
    requiredProps: ['name'],
  })

  const response: Awaited<DeleteStripeAccountReturn> = {
    data: [{ success: true }],
  }

  logger.info(`END: ${routeId}`, { response })

  return response
}

export type DeleteStripeAccountReturn = Promise<{
  data: {
    success: boolean
  }[]
}>
