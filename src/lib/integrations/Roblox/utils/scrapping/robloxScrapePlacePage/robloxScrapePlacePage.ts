import assert from '@useweb/assert'
import { load } from 'cheerio'

import type { RobloxGameProps } from '../../../../../../apiFunctions/roblox/getRobloxGameInfo/getRobloxGameInfo.js'

export type RobloxScrapePlacePageProps = { placeId: number; fetchFn: any }

export default async function robloxScrapePlacePage(props: RobloxScrapePlacePageProps) {
  assert<RobloxScrapePlacePageProps>({ props, requiredProps: ['placeId'] })

  try {
    const gameLink = `https://www.roblox.com/games/${props.placeId}`
    const robloxPageHtml = await props.fetchFn(gameLink).then((d) => d.text())
    const $ = load(robloxPageHtml)

    const gameInfo: RobloxGameProps = {
      id: props.placeId,
      gameLink,
      name: $('title').text(),
      description: $('.game-description').text(),
      thumbnail: $('meta[name="twitter:image1"]').attr('content') || '',
      active: $('ul.game-stats-container')
        ?.children('li')
        ?.first()
        ?.children('p')
        ?.last()
        ?.text(),
      visits: $('p#game-visit-count')?.text(),
      by: $('.text-name')?.text(),
      created: $("p.text-label:contains('Created')").next().text(),
      updated: $("p.text-label:contains('Updated')").next().text(),
      serverSize: $("p.text-label:contains('Server Size')").next().text(),
      genre: $("p.text-label:contains('Genre')").next().text(),
      allowedGear: $("p.text-label:contains('Allowed Gear')").next().text(),
      favorites: $('.game-favorite-count')?.text(),
    }

    if (!gameInfo.active && !gameInfo.description && !gameInfo.thumbnail) {
      console.log('gameInfo', gameInfo)
      throw new Error(`Could not find game info for ${props.placeId}`)
    }

    return gameInfo
  } catch (error: any) {
    throw new Error(error)
  }
}

export type RobloxScrapePlacePageReturn = ReturnType<typeof robloxScrapePlacePage>
