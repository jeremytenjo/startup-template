import assert from '@useweb/assert'

import type {
  SupabaseDatabaseApiProps,
  SupabaseDatabaseApiReturn,
} from '../supabaseDatabaseApi.js'

import * as supbaseRouteExample from './supbaseRouteExample/supbaseRouteExample.js'

import type { RouteSchemaProps } from '@/firebaseFunctions/src/utils/useApiRouteData/useApiRouteData.js'

export type SupabaseDatabaseApiRoutesProps = SupabaseDatabaseApiProps

export default async function supabaseDatabaseApiRoutes<
  RouteSchema extends RouteSchemaProps,
>(
  props: SupabaseDatabaseApiRoutesProps,
): Promise<SupabaseDatabaseApiReturn<RouteSchema>> {
  assert<SupabaseDatabaseApiRoutesProps>({
    props,
    requiredProps: ['context'],
  })

  // Exmaple
  if (props.context.route === supbaseRouteExample.routeId) {
    try {
      return await supbaseRouteExample.default({
        authUser: props.authUser,
        payload: props.context.payload,
      })
    } catch (error: any) {
      throw new Error(`${supbaseRouteExample.routeId} - ${error}`, {
        cause: error?.cause,
      })
    }
  }

  throw new Error(`Action doesn't exist - ${props.context.route}`)
}
