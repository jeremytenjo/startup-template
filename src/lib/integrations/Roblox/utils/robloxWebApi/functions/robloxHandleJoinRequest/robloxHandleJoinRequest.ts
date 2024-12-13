import assert from '@useweb/assert'

import fetchRobloxWebApi from '../../fetchRobloxWebApi/fetchRobloxWebApi.js'

export type RobloxHandleJoinRequestProps = {
  group: number
  userId: number
  accept: boolean
}

export default async function robloxHandleJoinRequest(
  props: RobloxHandleJoinRequestProps,
) {
  assert<RobloxHandleJoinRequestProps>({
    props,
    requiredProps: ['group', 'userId', 'accept'],
  })

  const res = await fetchRobloxWebApi<{
    code: number
    message: string
  }>({
    name: 'robloxHandleJoinRequest',
    url: `https://groups.roblox.com/v1/groups/${props.group}/join-requests/users/${props.userId}`,
    method: props.accept ? 'POST' : 'DELETE',
    useXcsrfToken: true,
  })

  if (res.code === 0) {
    throw new Error(res.message, { cause: { props } })
  }

  return res
}

export type RobloxHandleJoinRequestReturn = ReturnType<typeof robloxHandleJoinRequest>
