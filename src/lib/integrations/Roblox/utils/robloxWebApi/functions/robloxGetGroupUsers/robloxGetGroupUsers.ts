import assert from '@useweb/assert'

import fetchRobloxWebApi from '../../fetchRobloxWebApi/fetchRobloxWebApi.js'

export type RobloxGetGroupUsersProps = {
  groupId: number
}

// https://github.com/noblox/noblox.js/blob/master/lib/groups/getPlayers.js
export default async function robloxGetGroupUsers(props: RobloxGetGroupUsersProps) {
  assert<RobloxGetGroupUsersProps>({
    props,
    requiredProps: ['groupId'],
  })

  const res = await fetchRobloxWebApi<RobloxGetGroupUsersReturnSchema>({
    name: 'robloxGetGroupUsers',
    url: `https://groups.roblox.com/v1/groups/${props.groupId}/users?limit=100`,
    method: 'GET',
  })

  if (res.code === 0) {
    throw new Error(res.message, { cause: { props } })
  }

  return res
}

export type RobloxGetGroupUsersReturn = ReturnType<typeof robloxGetGroupUsers>

export type RobloxGetGroupUsersReturnSchema = {
  data: Datum[]
  previousPageCursor?: any
  nextPageCursor?: any
  code?: number
  message?: string
}

interface Datum {
  user: User
  role: Role
}

interface Role {
  id: number
  name: string
  rank: number
}

interface User {
  hasVerifiedBadge: boolean
  userId: number
  username: string
  displayName: string
}
