import useData from '@useweb/use-data'
import logError from '@/src/lib/utils/loggers/logError/logError'
import { useMemo } from 'react'

import adminApiClient, {
  type AdminApiClientProps,
  type AdminApiClientReturn,
} from '../../adminApi.client.js'
import type { ApiRouteSchema } from '../../../utils/useApiRouteData/useApiRouteData.js'
import type UserSchema from '../../../../../src/data/users/user.schema.js'

export type UseAdminApiPersistProps<RouteSchema extends ApiRouteSchema> =
  AdminApiClientProps<RouteSchema>

export function getAdminApiDataId<RouteSchema extends ApiRouteSchema>(props: {
  authId: string | undefined
  route: RouteSchema['route']
  id: string | undefined
  allowUnauthenticatedUser: boolean
}) {
  const extraId = props.id ? `/${props.id}` : ''
  let dataId =
    props.authId && props.route
      ? `adminApi/${props.authId}/${props.route}${extraId}`
      : undefined

  if (props.allowUnauthenticatedUser && props.route) {
    dataId = `adminApi/${props.route}${extraId}`
  }

  return {
    id: dataId,
  }
}

export default function useAdminApiPersist<RouteSchema extends ApiRouteSchema>(
  props: Partial<UseAdminApiPersistProps<RouteSchema>> & {
    currentUser: UserSchema | undefined
    id: string | undefined
    allowUnauthenticatedUser?: boolean
  },
) {
  const id = useMemo(() => {
    return props?.id
      ? getAdminApiDataId({
          authId: props.currentUser?.id,
          route: props.api?.route as string,
          id: props.id,
          allowUnauthenticatedUser: Boolean(props.allowUnauthenticatedUser),
        }).id
      : undefined
  }, [props.currentUser?.id, props.api?.route, props.id, props.allowUnauthenticatedUser])

  const adminApi = useData<
    Awaited<AdminApiClientReturn<RouteSchema>['data']>,
    AdminApiClientProps<RouteSchema>,
    AdminApiClientProps<RouteSchema>['api']['payload']
  >({
    id,
    get: {
      fetcher: async (p) => {
        const adminApiRes = await adminApiClient<RouteSchema>({
          options: props.options,
          api: {
            route: props.api?.route,
            payload: {
              ...(props.api?.payload || {}),
              ...(p.api?.payload || {}),
            },
          },
        })

        if (adminApiRes.data) {
          return adminApiRes.data
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
          fnName: `useAdminApiPersist - get - ${props.api?.route}`,
          metadata: { props },
        })
      },
    },
  })

  return adminApi
}

export type UseAdminApiReturn = ReturnType<typeof useAdminApiPersist>
