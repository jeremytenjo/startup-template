import assert from '@useweb/assert'

import fetchRobloxWebApi from '../../fetchRobloxWebApi/fetchRobloxWebApi.js'

export type RobloxRemoveUserFromGroupProps = {
  group: number
  userId: number
}

export default async function robloxRemoveUserFromGroup(
  props: RobloxRemoveUserFromGroupProps,
) {
  assert<RobloxRemoveUserFromGroupProps>({
    props,
    requiredProps: ['group', 'userId'],
  })

  const res = await fetchRobloxWebApi<{
    code: number
    message: string
  }>({
    name: 'robloxRemoveUserFromGroup',
    url: `https://groups.roblox.com/v1/groups/${props.group}/users/${props.userId}`,
    useXcsrfToken: true,
    method: 'DELETE',
  })

  if (res.code === 0) {
    throw new Error(res.message, { cause: { props } })
  }

  return res
}

export type RobloxRemoveUserFromGroupReturn = ReturnType<typeof robloxRemoveUserFromGroup>
