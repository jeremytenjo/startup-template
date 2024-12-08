import type { UseAsyncProps } from '@useweb/use-async'
import useAsync from '@useweb/use-async'
import { httpsCallable } from 'firebase/functions'

import { functions } from '../../../src/lib/integrations/Google/Firebase/firebase.js'
import logError from '../../../src/lib/utils/loggers/logError/logError.js'

import type { MiscFunctionsProps, MiscFunctionsReturn } from './miscFunctions.js'

import type {
  ApiRouteSchema,
  RouteSchemaProps,
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
  const miscFunctions = httpsCallable<
    MiscFunctionsClientProps<RouteSchema>['api'],
    MiscFunctionsReturn<RouteSchema>
  >(functions, 'miscFunctions')

  const res = await miscFunctions(props.api)

  return res.data
}

export type MiscFunctionsClientReturn<RouteSchema extends ApiRouteSchema> =
  MiscFunctionsReturn<RouteSchema>

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
