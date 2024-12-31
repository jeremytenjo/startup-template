import supabaseDatabaseApiRoutes from './routes/supabaseDatabaseApi.routes.js'

import type {
  ApiRouteSchema,
  RouteSchemaProps,
} from '@/firebaseFunctions/src/utils/useApiRouteData/useApiRouteData.js'

export type SupabaseDatabaseApiProps<RouteSchema extends RouteSchemaProps = any> = {
  authUser: ApiRouteSchema['authUser']
  context: ApiRouteSchema<RouteSchema>
}

export type SupabaseDatabaseApiReturn<RouteSchema extends RouteSchemaProps> =
  RouteSchema['return']

export default async function supabaseDatabaseApi<RouteSchema extends RouteSchemaProps>(
  props: SupabaseDatabaseApiProps,
): Promise<SupabaseDatabaseApiReturn<RouteSchema>> {
  if (props.context.route.startsWith('routes/')) {
    return await supabaseDatabaseApiRoutes<RouteSchema>(props)
  }

  throw new Error(`Route doesn't exist - ${props.context.route}`)
}
