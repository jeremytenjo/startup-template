import miscFunctionsRoutes from './routes/miscFunctions.routes.js'

import type {
  ApiRouteSchema,
  RouteSchemaProps,
} from '@/firebaseFunctions/src/utils/useApiRouteData/useApiRouteData.js'

export type MiscFunctionsProps<RouteSchema extends RouteSchemaProps = any> = {
  authUser: ApiRouteSchema['authUser']
  context: ApiRouteSchema<RouteSchema>
}

export type MiscFunctionsReturn<RouteSchema extends ApiRouteSchema> =
  RouteSchema['return']

export default async function miscFunctions<RouteSchema extends ApiRouteSchema>(
  props: MiscFunctionsProps,
): Promise<MiscFunctionsReturn<RouteSchema>> {
  if (props.context.route.startsWith('routes/')) {
    return await miscFunctionsRoutes<RouteSchema>(props)
  }

  throw new Error(`Route doesn't exist - ${props.context.route}`, {
    cause: {
      props,
    },
  })
}
