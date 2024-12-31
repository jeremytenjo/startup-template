import type { UseAsyncProps } from '@useweb/use-async'

import type {
  SupabaseDatabaseApiProps,
  SupabaseDatabaseApiReturn,
} from './supabaseDatabaseApi.js'

import {
  callFirebaseFunction,
  type RouteSchemaProps,
} from '@/firebaseFunctions/src/utils/useApiRouteData/useApiRouteData.js'

export type SupabaseDatabaseApiClientProps<RouteSchema extends RouteSchemaProps> = {
  api: Omit<SupabaseDatabaseApiProps<RouteSchema>['context'], 'return' | 'authUser'>
  options?: Partial<
    UseAsyncProps<
      SupabaseDatabaseApiClientProps<RouteSchema>['api'],
      RouteSchema['return']
    >
  >
}

export default async function supabaseDatabaseApiClient<
  RouteSchema extends RouteSchemaProps,
>(
  props: SupabaseDatabaseApiClientProps<RouteSchema>,
): Promise<SupabaseDatabaseApiReturn<RouteSchema>> {
  const res = await callFirebaseFunction({
    name: 'supabaseDatabaseApi',
    api: props.api,
  })

  return res
}

export type SupabaseDatabaseApiClientReturn<RouteSchema extends RouteSchemaProps> =
  SupabaseDatabaseApiReturn<RouteSchema>
