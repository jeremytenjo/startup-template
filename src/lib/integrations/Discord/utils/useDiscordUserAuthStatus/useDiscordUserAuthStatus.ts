import useAsync from '@useweb/use-async'
import { useEffect, useState } from 'react'
import { type APIUser } from 'discord-api-types/v10'
import { useRouter } from 'next/router'

import logError from '../../../../utils/loggers/logError/logError.js'
import getDiscordUser from '../getDiscordUser/getDiscordUser.js'
import useAuth from '../../../../../data/users/utils/useAuth/useAuth.js'

export type UseDiscordUserAuthStatusProps = {
  accessToken: string | undefined
  onSuccess: (props: { discordUser: APIUser }) => any
  disabled: boolean
}

// https://discord.com/developers/applications/1233490732652826654/oauth2
export default function useDiscordUserAuthStatus(props: UseDiscordUserAuthStatusProps) {
  const auth = useAuth()
  const router = useRouter()

  const discordUserAuthStatus = useAsync<
    {
      accessToken: string
    },
    { discordUser: APIUser }
  >({
    fn: async (p) => {
      const { discordUser } = await getDiscordUser({
        accessToken: p.accessToken,
      })

      props.onSuccess({
        discordUser,
      })

      router.replace('/settings/notifications')

      return { discordUser }
    },
    onError({ error, fnProps }) {
      logError({
        error,
        fnName: 'discordUserAuthStatus',
        metadata: { fnProps },
      })
    },
  })

  useEffect(() => {
    if (props.accessToken && auth.user?.id && !props.disabled) {
      discordUserAuthStatus.exec({
        accessToken: props.accessToken,
      })
    }
  }, [props.accessToken, auth.user?.id, props.disabled])

  return discordUserAuthStatus
}

export type UseDiscordUserAuthStatusReturn = ReturnType<typeof useDiscordUserAuthStatus>

type UseDiscordUserAuthStatusFromUrlProps = {
  onSuccess: UseDiscordUserAuthStatusProps['onSuccess']
  disabled: UseDiscordUserAuthStatusProps['disabled']
}

export const useDiscordUserAuthStatusFromUrl = (
  props: UseDiscordUserAuthStatusFromUrlProps,
) => {
  const [accessToken, setAccessToken] = useState<undefined | string>()

  useEffect(() => {
    const urlObj = new URL(location.href)
    const params = new URLSearchParams(urlObj.hash.substring(1)) // remove the '#' at the start of the hash
    const accessToken = params.get('access_token')

    if (accessToken) {
      setAccessToken(accessToken)
    }
  }, [])

  return useDiscordUserAuthStatus({ accessToken, ...props })
}
