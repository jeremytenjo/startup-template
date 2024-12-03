import assert from '@useweb/assert'

import logError from '../../loggers/logError/logError.js'

export type GetRobloxGamePlaceIdFromUrlProps = { robloxUrl: string }

export default function getRobloxGamePlaceIdFromUrl(
  props: GetRobloxGamePlaceIdFromUrlProps,
) {
  assert<GetRobloxGamePlaceIdFromUrlProps>({ props, requiredProps: ['robloxUrl'] })

  if (!props.robloxUrl.includes('roblox.com/games/')) {
    logError({
      fnName: 'getRobloxGamePlaceIdFromUrl',
      error: `getRobloxGamePlaceIdFromUrl robloxUrl doesn't include roblox.com/games/ not found in ${props.robloxUrl}`,
      metadata: { props },
    })
  }

  const url = props.robloxUrl.split('/')
  const placeId = url[4]

  if (!placeId) {
    logError({
      fnName: 'getRobloxGamePlaceIdFromUrl',
      error: `Place id not found in ${props.robloxUrl}`,
      metadata: { props },
    })
  }

  return { placeId }
}

export type GetRobloxGamePlaceIdFromUrlReturn = ReturnType<
  typeof getRobloxGamePlaceIdFromUrl
>
