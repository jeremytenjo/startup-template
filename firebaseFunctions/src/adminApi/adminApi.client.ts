import type { UseAsyncProps } from '@useweb/use-async'

import type { AdminApiProps, AdminApiReturn } from './adminApi.js'

import {
  callFirebaseFunction,
  type RouteSchemaProps,
} from '@/firebaseFunctions/src/utils/useApiRouteData/useApiRouteData.js'

export type AdminApiClientProps<RouteSchema extends RouteSchemaProps> = {
  api: Omit<AdminApiProps<RouteSchema>['context'], 'return' | 'authUser'>
  options?: Partial<
    UseAsyncProps<AdminApiClientProps<RouteSchema>['api'], RouteSchema['return']>
  >
}

export default async function adminApiClient<RouteSchema extends RouteSchemaProps>(
  props: AdminApiClientProps<RouteSchema>,
): Promise<AdminApiReturn<RouteSchema>> {
  const res = await callFirebaseFunction({
    name: 'adminApi',
    api: props.api,
  })

  return res
}

export type AdminApiClientReturn<RouteSchema extends RouteSchemaProps> =
  AdminApiReturn<RouteSchema>
