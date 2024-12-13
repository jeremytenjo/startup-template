import assert from '@useweb/assert'
import type { GroupJoinRequestsPage } from 'noblox.js'

import fetchRobloxWebApi from '../../fetchRobloxWebApi/fetchRobloxWebApi.js'

export type GetJoinRequestsProps = {
  group: number
  limit?: number
  sortOrder?: 'Asc' | 'Desc'
  cursor?: string
}

export default async function robloxGetJoinRequests(
  props: GetJoinRequestsProps,
): GetJoinRequestsReturn {
  assert<GetJoinRequestsProps>({ props, requiredProps: ['group'] })

  let returnData: GroupJoinRequestsPage = undefined as any

  const data: GroupJoinRequestsPage['data'] = []

  async function fetchAllJoinRequests(props: any, cursor: string = '') {
    const searchParams = new URLSearchParams({
      limit: props.limit?.toString() ?? '100',
      sortOrder: props.sortOrder ?? 'Asc',
      cursor: cursor,
    })

    // https://groups.roblox.com/docs/index.html?urls.primaryName=Groups%20Api%20v1
    const url = `https://groups.roblox.com/v1/groups/${props.group}/join-requests?${searchParams}`

    const res = await fetchRobloxWebApi<GroupJoinRequestsPage>({
      name: 'robloxGetJoinRequests',
      url,
    })

    returnData = res

    data.push(...(res.data || []))

    if (res.nextPageCursor) {
      const nextResults = await fetchAllJoinRequests(props, res.nextPageCursor)
      data.push(...(nextResults.data || []))
    }

    return res
  }

  await fetchAllJoinRequests(props)

  return { ...returnData, data }
}

export type GetJoinRequestsReturn = Promise<GroupJoinRequestsPage>
