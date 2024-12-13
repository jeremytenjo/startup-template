import { useRouter } from 'next/router'

import { robloxConfig } from '../../roblox.config.js'
import type {
  API_RobloxGetUserInfo,
  RobloxGetAuthTokenReturn,
} from '../../../../../../firebaseFunctions/src/miscFunctions/routes/roblox/robloxGetUserInfo/robloxGetUserInfo.js'
import useMiscFunctions from '../../../../../../firebaseFunctions/src/miscFunctions/utils/useMiscFunctions/useMiscFunctions.js'

export type UseRobloxOauthProps<StateSchema> = {
  state: StateSchema
  onSuccess?: (
    props: {
      state: StateSchema
    } & Awaited<RobloxGetAuthTokenReturn>['data'][0],
  ) => any
}

export default function useRobloxOauth<StateSchema>(
  props: UseRobloxOauthProps<StateSchema>,
) {
  const router = useRouter()
  const oauthKey = 'roblox_'
  const robloxAuthorizationCode = router?.query?.code as string | undefined
  const stateRaw = router?.query?.state as string | undefined
  const state = !stateRaw?.includes(oauthKey)
    ? undefined
    : (stateRaw?.replace(oauthKey, '') as StateSchema | undefined)

  const initiateAuth = () => {
    const authorizationUrl = `https://apis.roblox.com/oauth/v1/authorize?client_id=${robloxConfig.clientId}&redirect_uri=${window.location.origin}${window.location.pathname}&scope=openid profile&response_type=code&state=${oauthKey}${props.state}`

    window.location.href = authorizationUrl
  }

  const robloxGetUserInfo = useMiscFunctions<API_RobloxGetUserInfo>({
    currentUser: undefined,
    allowUnauthenticatedUser: true,
    id: robloxAuthorizationCode,
    fetchOnTrue: Boolean(robloxAuthorizationCode && state),
    api: {
      route: 'routes/robloxGetUserInfo',
      payload: {
        authorizationToken: robloxAuthorizationCode as string,
      },
    },
    options: {
      onResult: ({ result }) => {
        if (props.onSuccess) {
          props.onSuccess({
            state: state as StateSchema,
            ...result.data[0],
          })
        }
      },
    },
  })

  return { initiateAuth, robloxGetUserInfo, robloxAuthorizationCode }
}

export type UseRobloxOauthReturn = ReturnType<typeof useRobloxOauth>
