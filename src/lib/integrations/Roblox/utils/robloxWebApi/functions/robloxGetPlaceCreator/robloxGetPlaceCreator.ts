import assert from '@useweb/assert'

import fetchRobloxWebApi from '../../fetchRobloxWebApi/fetchRobloxWebApi.js'

export type RobloxGetPlaceCreatorProps = {
  placeId: number
}

export default async function robloxGetPlaceCreator(props: RobloxGetPlaceCreatorProps) {
  assert<RobloxGetPlaceCreatorProps>({ props, requiredProps: ['placeId'] })

  const res = await fetchRobloxWebApi<any>({
    name: 'robloxGetPlayerInfo',
    url: `https://games.roblox.com/v1/games/multiget-place-details?placeIds=${props.placeId}`,
  })

  const creator = res['0'] as RobloxPlaceDetails

  if (!creator?.builder || !creator?.builderId) {
    throw new Error('No creator found', { cause: { props } })
  }

  return {
    builderId: creator?.builderId,
    name: creator?.builder,
  }
}

export type RobloxPlaceDetails = {
  placeId: number
  name: string
  description: string
  sourceName: string
  sourceDescription: string
  url: string
  builder: string
  builderId: number
  hasVerifiedBadge: boolean
  isPlayable: boolean
  reasonProhibited: string
  universeId: number
  universeRootPlaceId: number
  price: number
  imageToken: string
}
