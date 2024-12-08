import useData from '@useweb/use-data'
import logError from '@/src/lib/utils/loggers/logError/logError'

import miscFunctionsClient, {
  type MiscFunctionsClientProps,
  type MiscFunctionsClientReturn,
} from '../../miscFunctions.client.js'
import type { ApiRouteSchema } from '../../../utils/useApiRouteData/useApiRouteData.js'
import type UserSchema from '../../../../../src/data/users/user.schema.js'

export type UseMiscFunctionsProps<RouteSchema extends ApiRouteSchema> =
  MiscFunctionsClientProps<RouteSchema>

export function getMiscFunctionsDataId<RouteSchema extends ApiRouteSchema>(props: {
  authId: string | undefined
  route: RouteSchema['route']
  id: string | undefined
  allowUnauthenticatedUser: boolean
}) {
  const extraId = props.id ? `/${props.id}` : ''
  let dataId =
    props.authId && props.route
      ? `miscFunctions/${props.authId}/${props.route}${extraId}`
      : undefined

  if (props.allowUnauthenticatedUser && props.route) {
    dataId = `miscFunctions/${props.route}${extraId}`
  }

  return {
    id: dataId,
  }
}

export default function useMiscFunctions<RouteSchema extends ApiRouteSchema>(
  props: Partial<UseMiscFunctionsProps<RouteSchema>> & {
    currentUser: UserSchema | undefined
    id: string | undefined
    fetchOnTrue?: boolean
    allowUnauthenticatedUser?: boolean
  },
) {
  const fetchOnTrue = props.fetchOnTrue === undefined ? true : props.fetchOnTrue
  const miscFunctions = useData<
    Awaited<
      MiscFunctionsClientReturn<RouteSchema>['data'] & {
        id: string
      }
    >,
    MiscFunctionsClientProps<RouteSchema>,
    MiscFunctionsClientProps<RouteSchema>['api']['payload']
  >({
    id: fetchOnTrue
      ? getMiscFunctionsDataId({
          authId: props.currentUser?.id,
          route: props.api?.route as string,
          id: props?.id,
          allowUnauthenticatedUser: Boolean(props.allowUnauthenticatedUser),
        }).id
      : undefined,
    get: {
      fetcher: async (p) => {
        const miscFunctionsRes = await miscFunctionsClient<RouteSchema>({
          options: props.options,
          api: {
            route: props.api?.route,
            payload: {
              ...(props.api?.payload || {}),
              ...(p.api?.payload || {}),
            },
          },
        })

        if (miscFunctionsRes.data) {
          return [
            {
              id: getMiscFunctionsDataId({
                authId: props.currentUser?.id,
                route: props.api?.route as string,
                id: props?.id,
                allowUnauthenticatedUser: Boolean(props.allowUnauthenticatedUser),
              }).id as string,
              ...miscFunctionsRes.data,
            },
          ]
        }

        return []
      },
      onGet({ result }) {
        if (props.options?.onResult) {
          props.options.onResult({
            result: {
              data: [result[0]['0']],
            },
          })
        }
      },
      onGetError({ error }) {
        logError({
          error,
          fnName: `useMiscFunctions - get - ${props.api?.route}`,
          metadata: { props },
        })
      },
    },
  })

  return miscFunctions
}

export type UseMiscFunctionsReturn = ReturnType<typeof useMiscFunctions>
