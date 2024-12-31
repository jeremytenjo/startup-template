import useData from '@useweb/use-data'
import logError from '@/src/lib/utils/loggers/logError/logError'
import { useMemo } from 'react'

import supabaseDatabaseApiClient, {
  type SupabaseDatabaseApiClientProps,
  type SupabaseDatabaseApiClientReturn,
} from '../../supabaseDatabaseApi.client.js'
import type { ApiRouteSchema } from '../../../utils/useApiRouteData/useApiRouteData.js'
import type UserSchema from '../../../../../src/data/users/user.schema.js'

export type UseSupabaseDatabaseApiPersistProps<RouteSchema extends ApiRouteSchema> =
  SupabaseDatabaseApiClientProps<RouteSchema>

export function getSupabaseDatabaseApiDataId<RouteSchema extends ApiRouteSchema>(props: {
  authId: string | undefined
  route: RouteSchema['route']
  id: string | undefined
  allowUnauthenticatedUser: boolean
}) {
  const extraId = props.id ? `/${props.id}` : ''
  let dataId =
    props.authId && props.route
      ? `supabaseDatabaseApi/${props.authId}/${props.route}${extraId}`
      : undefined

  if (props.allowUnauthenticatedUser && props.route) {
    dataId = `supabaseDatabaseApi/${props.route}${extraId}`
  }

  return {
    id: dataId,
  }
}

export default function useSupabaseDatabaseApiPersist<RouteSchema extends ApiRouteSchema>(
  props: Partial<UseSupabaseDatabaseApiPersistProps<RouteSchema>> & {
    currentUser: UserSchema | undefined
    id: string | undefined
    allowUnauthenticatedUser?: boolean
  },
) {
  const id = useMemo(() => {
    return props?.id
      ? getSupabaseDatabaseApiDataId({
          authId: props.currentUser?.id,
          route: props.api?.route as string,
          id: props.id,
          allowUnauthenticatedUser: Boolean(props.allowUnauthenticatedUser),
        }).id
      : undefined
  }, [props.currentUser?.id, props.api?.route, props.id, props.allowUnauthenticatedUser])

  const supabaseDatabaseApi = useData<
    Awaited<SupabaseDatabaseApiClientReturn<RouteSchema>['data']>,
    SupabaseDatabaseApiClientProps<RouteSchema>,
    SupabaseDatabaseApiClientProps<RouteSchema>['api']['payload']
  >({
    id,
    get: {
      fetcher: async (p) => {
        const supabaseDatabaseApiRes = await supabaseDatabaseApiClient<RouteSchema>({
          options: props.options,
          api: {
            route: props.api?.route,
            payload: {
              ...(props.api?.payload || {}),
              ...(p.api?.payload || {}),
            },
          },
        })

        if (supabaseDatabaseApiRes.data) {
          return supabaseDatabaseApiRes.data
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
          fnName: `useSupabaseDatabaseApiPersist - get - ${props.api?.route}`,
          metadata: { props },
        })
      },
    },
  })

  return supabaseDatabaseApi
}

export type UseSupabaseDatabaseApiReturn = ReturnType<
  typeof useSupabaseDatabaseApiPersist
>
