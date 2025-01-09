import assert from '@useweb/assert'

import type { AdminApiProps, AdminApiReturn } from '../adminApi.js'

import * as exampleRoute from './exampleRoute/exampleRoute.js'

import type { RouteSchemaProps } from '@/firebaseFunctions/src/utils/useApiRouteData/useApiRouteData.js'

export type AdminApiRoutesProps = AdminApiProps

export default async function adminApiRoutes<RouteSchema extends RouteSchemaProps>(
  props: AdminApiRoutesProps,
): Promise<AdminApiReturn<RouteSchema>> {
  assert<AdminApiRoutesProps>({
    props,
    requiredProps: ['context'],
  })

  if (props.context.route === exampleRoute.routeId) {
    try {
      return await exampleRoute.default({
        authUser: props.authUser,
        payload: props.context.payload,
      })
    } catch (error: any) {
      throw new Error(`${exampleRoute.routeId} - ${error}`, {
        cause: error?.cause,
      })
    }
  }

  throw new Error(`Action doesn't exist - ${props.context.route}`)
}
