import assert from '@useweb/assert'

import type { MiscFunctionsProps, MiscFunctionsReturn } from '../miscFunctions.js'

// users
import * as deactivateAccount from './users/deactivateAccount/deactivateAccount.js'
// stripe
import * as createConnectedAccount from './stripe/createConnectedAccount/createConnectedAccount.js'

import type { ApiRouteSchema } from '@/firebaseFunctions/src/utils/useApiRouteData/useApiRouteData.js'

export type MiscFunctionsRoutesProps = MiscFunctionsProps

export default async function miscFunctionsRoutes<RouteSchema extends ApiRouteSchema>(
  props: MiscFunctionsRoutesProps,
): Promise<MiscFunctionsReturn<RouteSchema>> {
  assert<MiscFunctionsRoutesProps>({
    props,
    requiredProps: ['context'],
  })

  // users
  if (props.context.route === deactivateAccount.routeId) {
    try {
      return await deactivateAccount.default({
        authUser: props.authUser,
        payload: props.context.payload,
      })
    } catch (error: any) {
      throw new Error(`${deactivateAccount.routeId} - ${error}`, {
        cause: error?.cause,
      })
    }
  }

  // stripe
  if (props.context.route === createConnectedAccount.routeId) {
    try {
      return await createConnectedAccount.default({
        authUser: props.authUser,
        payload: props.context.payload,
      })
    } catch (error: any) {
      throw new Error(`${createConnectedAccount.routeId} - ${error}`, {
        cause: error?.cause,
      })
    }
  }

  throw new Error(`Action doesn't exist - ${props.context.route}`, {
    cause: {
      props,
    },
  })
}
