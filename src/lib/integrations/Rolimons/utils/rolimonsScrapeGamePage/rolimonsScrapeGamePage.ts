import assert from '@useweb/assert'
import crossFetch from 'cross-fetch'
import { load } from 'cheerio'

export type RolimonsScrapeGamePageProps = { placeId: number }

export default async function rolimonsScrapeGamePage(props: RolimonsScrapeGamePageProps) {
  assert<RolimonsScrapeGamePageProps>({ props, requiredProps: ['placeId'] })
  const html = await crossFetch(`https://www.rolimons.com/game/${props.placeId}`).then(
    (res) => res.text(),
  )

  const $ = load(html)

  const ccu = Number($('.game_stat_data')?.first()?.text()?.trim().replaceAll(',', ''))

  return { ccu }
}

export type RolimonsScrapeGamePageReturn = ReturnType<typeof rolimonsScrapeGamePage>
