import assert from '@useweb/assert'

import fetchRobloxWebApi from '../../fetchRobloxWebApi/fetchRobloxWebApi.js'

export type RobloxGetUserGamesProps = { userId: number; cursor?: string }

export default async function robloxGetUserGames(props: RobloxGetUserGamesProps) {
  assert<RobloxGetUserGamesProps>({ props, requiredProps: ['userId'] })

  const res = await fetchRobloxWebApi<RobloxGetUsersGamesReturnSchema>({
    name: 'robloxGetGroupUsers',
    url: `https://games.roblox.com/v2/users/${props.userId}/games?cursor=${
      props.cursor || ''
    }`,
    method: 'GET',
  })

  if (res.code === 0) {
    throw new Error(res.message, { cause: { props } })
  }

  let allData = res.data

  if (res.nextPageCursor) {
    const nextProps = { ...props, cursor: res.nextPageCursor }
    const nextData = await robloxGetUserGames(nextProps)
    allData = allData.concat(nextData.data)
  }

  return { ...res, data: allData }
}

export type RobloxGetUserGamesReturn = ReturnType<typeof robloxGetUserGames>

export type RobloxGetUsersGamesReturnSchema = {
  data: DataItem[]
  previousPageCursor: string
  nextPageCursor: string
  code?: number
  message?: string
}

interface Creator {
  id: number
  type: number
  name: string
}

interface RootPlace {
  id: number
  type: number
  name: string
}

interface DataItem {
  id: number
  name: string
  description: string
  creator: Creator
  rootPlace: RootPlace
  created: string
  updated: string
  placeVisits: number
}
