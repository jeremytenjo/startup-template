import assert from '@useweb/assert'

import type { MiscFunctionsProps, MiscFunctionsReturn } from '../miscFunctions.js'

import * as deactivateAccount from './deactivateAccount/deactivateAccount.js'

import type { ApiRouteSchema } from '@/firebaseFunctions/src/utils/useApiRouteData/useApiRouteData.js'

export type MiscFunctionsRoutesProps = MiscFunctionsProps

export default async function miscFunctionsRoutes<RouteSchema extends ApiRouteSchema>(
  props: MiscFunctionsRoutesProps,
): Promise<MiscFunctionsReturn<RouteSchema>> {
  assert<MiscFunctionsRoutesProps>({
    props,
    requiredProps: ['context'],
  })

  // Users
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

  throw new Error(`Action doesn't exist - ${props.context.route}`, {
    cause: {
      props,
    },
  })
}
