import assert from '@useweb/assert'

import fetchRobloxWebApi from '../../fetchRobloxWebApi/fetchRobloxWebApi.js'

export type RobloxGetPlayerInfoProps = { userId: number }

export type RobloxPlayerInfo = {
  description: string
  created: string
  isBanned: boolean
  externalAppDisplayName?: any
  hasVerifiedBadge: boolean
  id: number
  name: string
  displayName: string
}

export default async function robloxGetPlayerInfo(props: RobloxGetPlayerInfoProps) {
  assert<RobloxGetPlayerInfoProps>({ props, requiredProps: ['userId'] })

  const res = await fetchRobloxWebApi<RobloxPlayerInfo>({
    name: 'robloxGetPlayerInfo',
    url: `https://users.roblox.com/v1/users/${props.userId}`,
    dontUseCookie: true,
  })

  return res
}

export type RobloxGetPlayerInfoReturn = ReturnType<typeof robloxGetPlayerInfo>
