import assert from '@useweb/assert'

import fetchRobloxWebApi from '../../fetchRobloxWebApi/fetchRobloxWebApi.js'

export type RobloxSetGroupUserRankProps = {
  groupId: number
  userId: number
  rank: number
}

// https://github.com/noblox/noblox.js/blob/master/lib/groups/setRank.js
export default async function robloxSetGroupUserRank(props: RobloxSetGroupUserRankProps) {
  assert<RobloxSetGroupUserRankProps>({
    props,
    requiredProps: ['groupId', 'userId', 'rank'],
  })

  // rank 1 is default, roblox throws an error if you try to set a user to their current rank
  if (props.rank <= 1) {
    return true
  }

  const groupRoles = await fetchRobloxWebApi<RolesReturnSchema>({
    name: 'robloxSetGroupUserRank - groupRoles',
    url: `https://groups.roblox.com/v1/groups/${props.groupId}/roles`,
  })

  const role = groupRoles.roles.find((role) => role.rank === props.rank)

  if (!role) {
    throw new Error(`Rank not found`, {
      cause: {
        props,
        groupRoles,
      },
    })
  }

  const res = await fetchRobloxWebApi<{
    code: number
    message: string
  }>({
    name: 'robloxSetGroupUserRank - set rank',
    url: `https://groups.roblox.com/v1/groups/${props.groupId}/users/${props.userId}`,
    useXcsrfToken: true,
    method: 'PATCH',
    body: {
      roleId: role.id,
    },
  })

  if (res.code === 0) {
    throw new Error(res.message, { cause: { props } })
  }

  return res
}

export type RobloxSetGroupUserRankReturn = ReturnType<typeof robloxSetGroupUserRank>

type RolesReturnSchema = {
  groupId: number
  roles: {
    id: number
    name: string
    description: string
    rank: number
    memberCount: number
  }[]
}
