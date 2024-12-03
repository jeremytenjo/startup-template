import assert from '@useweb/assert'
import type { APIUser } from 'discord-api-types/v10'

import discordHttpApi from '../discordHttpApi/discordHttpApi.js'

export type GetDiscordUserProps = { accessToken: string }

export default async function getDiscordUser(props: GetDiscordUserProps) {
  assert<GetDiscordUserProps>({ props, requiredProps: ['accessToken'] })

  const discordUser = await discordHttpApi<APIUser>({
    ignoreDiscordToken: true,
    endpoint: 'users/@me',
    options: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
      },
    },
  })

  return { discordUser }
}

export type GetDiscordUserReturn = ReturnType<typeof getDiscordUser>
