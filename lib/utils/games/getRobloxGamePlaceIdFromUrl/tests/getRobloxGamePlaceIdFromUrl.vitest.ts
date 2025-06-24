// https://vitest.dev/api/
import { expect, test } from 'vitest'

import getRobloxGamePlaceIdFromUrl from '../getRobloxGamePlaceIdFromUrl.js'

test('Success', async () => {
  const result = getRobloxGamePlaceIdFromUrl({
    robloxUrl: 'https://www.roblox.com/games/5656646615/Dream-Island-RP',
  })

  const expected: ReturnType<typeof getRobloxGamePlaceIdFromUrl> = {
    placeId: '5656646615',
  }

  expect(result).toStrictEqual(expected)
})
