import useAsync from '@useweb/use-async'

import type { ApiRouteSchema } from '../../../utils/useApiRouteData/useApiRouteData.js'
import logError from '../../../../../src/lib/utils/loggers/logError/logError.js'
import type { AdminApiClientProps } from '../../adminApi.client.js'
import adminApiClient from '../../adminApi.client.js'

export function useAdminApiClient<RouteSchema extends ApiRouteSchema>(
  props: AdminApiClientProps<RouteSchema>,
) {
  const adminApi = useAsync<
    AdminApiClientProps<RouteSchema>['api'],
    RouteSchema['return']
  >({
    fn: async (p) =>
      await adminApiClient(
        p?.route
          ? {
              api: p,
            }
          : props,
      ),
    ...props.options,
    onError({ error, fnProps }) {
      logError({
        error,
        fnName: 'useAdminApiClient',
        metadata: { props, fnProps },
      })
    },
  })

  return adminApi
}
