import type { CallableRequest } from 'firebase-functions/v2/https'
import { httpsCallable } from 'firebase/functions'
import type { UseDataReturn } from '@useweb/use-data'
import useData from '@useweb/use-data'
import logError from '@/src/lib/utils/loggers/logError/logError'

import type { SupabaseDatabaseApiClientProps } from '../../supabaseDatabaseApi/supabaseDatabaseApi.client.js'
import type { SupabaseDatabaseApiReturn } from '../../supabaseDatabaseApi/supabaseDatabaseApi.js'
import { functions } from '../../../../src/lib/integrations/Google/Firebase/firebase.js'

export type UseApiRouteDataProps<RouteSchema extends ApiRouteSchema> = {
  fn: (props: any) => any
  routeData: RouteSchema
}

export type RouteSchemaProps = {
  route: string
  payload: any
  return: any
}

export type ApiRouteSchema<RouteSchema extends RouteSchemaProps = any> = {
  authUser: CallableRequest['auth'] | undefined
  route: RouteSchema['route']
  payload: RouteSchema['payload']
  return: {
    data: RouteSchema['return']
  }
}

export function getApiRouteDataDataId<RouteSchema extends ApiRouteSchema>(
  props: UseApiRouteDataProps<RouteSchema>['routeData'],
) {
  let dataId: string | undefined = `adminGetRefundData/${props.route}`

  if (props.payload === undefined || props.route === undefined) {
    return { dataId }
  } else {
    const params = new URLSearchParams()

    for (const [key, value] of Object.entries(props.payload || {})) {
      if (value !== undefined) {
        params.append(key, String(value))
      }
    }

    dataId = params.size ? `${dataId}/${params.toString()}` : undefined
  }

  return {
    dataId,
  }
}

export default function useApiRouteData<RouteSchema extends ApiRouteSchema>(
  props: UseApiRouteDataProps<RouteSchema>,
) {
  const adminGetRefundData = useData<
    Awaited<RouteSchema['return']['data']>,
    RouteSchema['payload']
  >({
    id: getApiRouteDataDataId(props.routeData).dataId,
    get: {
      fetcher: async () => {
        const res = await props.fn({
          route: props.routeData.route,
          payload: props.routeData.payload,
        })

        if (res.data) {
          if (!Array.isArray(res.data)) {
            throw new Error(`res.data must by an array`, { cause: {} })
          } else {
            return res.data
          }
        }

        return []
      },
      onGetError({ error }) {
        logError({
          error,
          fnName: `useApiRouteData - ${props.fn.name} - ${props.routeData.route}`,
          metadata: { props },
        })
      },
    },
  })

  return adminGetRefundData
}

export type UseApiRouteDataReturn<DataSchema extends ApiRouteSchema['return']> =
  UseDataReturn<DataSchema['data'][0], any>

export async function callFirebaseFunction<RouteSchema extends RouteSchemaProps>(
  props: SupabaseDatabaseApiClientProps<RouteSchema> & {
    name: string
  },
) {
  const callFunction = httpsCallable<
    SupabaseDatabaseApiClientProps<RouteSchema>['api'],
    SupabaseDatabaseApiReturn<RouteSchema>
  >(functions, props.name)

  try {
    const res = await callFunction(props.api)
    return res.data
  } catch (error: any) {
    const errorObj = JSON.parse(String(error).replace('FirebaseError: ', ''))

    throw new Error(errorObj.description, {
      cause: errorObj,
    })
  }
}
