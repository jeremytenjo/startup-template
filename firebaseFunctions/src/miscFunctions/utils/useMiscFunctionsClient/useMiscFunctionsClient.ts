import useAsync from '@useweb/use-async'
import { ApiRouteSchema } from '../../../utils/useApiRouteData/useApiRouteData'
import logError from '../../../../../src/lib/utils/loggers/logError/logError'
import miscFunctionsClient, { MiscFunctionsClientProps } from '../../miscFunctions.client'

export function useMiscFunctionsClient<RouteSchema extends ApiRouteSchema>(
  props: MiscFunctionsClientProps<RouteSchema>,
) {
  const miscFunctions = useAsync<
    MiscFunctionsClientProps<RouteSchema>['api'],
    RouteSchema['return']
  >({
    fn: async () => await miscFunctionsClient(props),
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
