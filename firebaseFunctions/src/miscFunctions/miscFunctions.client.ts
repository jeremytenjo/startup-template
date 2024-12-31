import type { UseAsyncProps } from '@useweb/use-async'

import type { MiscFunctionsProps, MiscFunctionsReturn } from './miscFunctions.js'

import {
  callFirebaseFunction,
  type ApiRouteSchema,
  type RouteSchemaProps,
} from '@/firebaseFunctions/src/utils/useApiRouteData/useApiRouteData.js'

export type MiscFunctionsClientProps<RouteSchema extends RouteSchemaProps> = {
  api: Omit<MiscFunctionsProps<RouteSchema>['context'], 'return' | 'authUser'>
  options?: Partial<
    UseAsyncProps<MiscFunctionsClientProps<RouteSchema>['api'], RouteSchema['return']>
  >
}

export default async function miscFunctionsClient<RouteSchema extends ApiRouteSchema>(
  props: MiscFunctionsClientProps<RouteSchema>,
): Promise<MiscFunctionsReturn<RouteSchema>> {
  const res = await callFirebaseFunction({
    name: 'miscFunctions',
    api: props.api,
  })

  return res
}

export type MiscFunctionsClientReturn<RouteSchema extends ApiRouteSchema> =
  MiscFunctionsReturn<RouteSchema>
