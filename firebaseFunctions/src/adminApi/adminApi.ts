import adminApiRoutes from './routes/adminApi.routes.js'

import type {
  ApiRouteSchema,
  RouteSchemaProps,
} from '@/firebaseFunctions/src/utils/useApiRouteData/useApiRouteData.js'

export type AdminApiProps<RouteSchema extends RouteSchemaProps = any> = {
  authUser: ApiRouteSchema['authUser']
  context: ApiRouteSchema<RouteSchema>
}

export type AdminApiReturn<RouteSchema extends RouteSchemaProps> = RouteSchema['return']

export default async function adminApi<RouteSchema extends RouteSchemaProps>(
  props: AdminApiProps,
): Promise<AdminApiReturn<RouteSchema>> {
  if (props.context.route.startsWith('routes/')) {
    return await adminApiRoutes<RouteSchema>(props)
  }

  throw new Error(`Route doesn't exist - ${props.context.route}`)
}
