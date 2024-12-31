import useAsync from '@useweb/use-async'

import type { ApiRouteSchema } from '../../../utils/useApiRouteData/useApiRouteData.js'
import logError from '../../../../../src/lib/utils/loggers/logError/logError.js'
import type { MiscFunctionsClientProps } from '../../miscFunctions.client.js'
import miscFunctionsClient from '../../miscFunctions.client.js'

export function useMiscFunctionsClient<RouteSchema extends ApiRouteSchema>(
  props: MiscFunctionsClientProps<RouteSchema>,
) {
  const miscFunctions = useAsync<
    MiscFunctionsClientProps<RouteSchema>['api'],
    RouteSchema['return']
  >({
    fn: async (p) =>
      await miscFunctionsClient(
        p.route
          ? {
              api: p,
            }
          : props,
      ),
    ...props.options,
    onError({ error, fnProps }) {
      logError({
        error,
        fnName: 'useMiscFunctionsClient',
        metadata: { props, fnProps },
      })
    },
  })

  return miscFunctions
}
