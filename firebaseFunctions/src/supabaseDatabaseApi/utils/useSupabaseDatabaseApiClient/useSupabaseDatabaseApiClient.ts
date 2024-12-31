import useAsync from '@useweb/use-async'

import type { ApiRouteSchema } from '../../../utils/useApiRouteData/useApiRouteData.js'
import logError from '../../../../../src/lib/utils/loggers/logError/logError.js'
import type { SupabaseDatabaseApiClientProps } from '../../supabaseDatabaseApi.client.js'
import supabaseDatabaseApiClient from '../../supabaseDatabaseApi.client.js'

export function useSupabaseDatabaseApiClient<RouteSchema extends ApiRouteSchema>(
  props: SupabaseDatabaseApiClientProps<RouteSchema>,
) {
  const supabaseDatabaseApi = useAsync<
    SupabaseDatabaseApiClientProps<RouteSchema>['api'],
    RouteSchema['return']
  >({
    fn: async (p) => {
      return await supabaseDatabaseApiClient(
        p?.route
          ? {
              api: p,
            }
          : props,
      )
    },
    ...props.options,
    onError({ error, fnProps }) {
      logError({
        error,
        fnName: 'useSupabaseDatabaseApiClient',
        metadata: { props, fnProps },
      })
    },
  })

  return supabaseDatabaseApi
}
