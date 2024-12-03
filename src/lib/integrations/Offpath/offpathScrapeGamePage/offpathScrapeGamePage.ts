import assert from '@useweb/assert'
import crossFetch from 'cross-fetch'
import { load } from 'cheerio'

export type OffpathScrapeGamePageProps = { placeId: number }

export default async function offpathScrapeGamePage(props: OffpathScrapeGamePageProps) {
  assert<OffpathScrapeGamePageProps>({ props, requiredProps: ['placeId'] })

  const html = await crossFetch(`https://offpath.gg/games/${props.placeId}`).then((r) =>
    r.text(),
  )

  const $ = load(html)

  const lifeTimeVisitsText = $('h2[title]').first().text().trim()
  const sevenDayVisitsText = $('td:contains("7 Days")')
    .next()
    .next()
    .find('div.leading-5')
    .first()
    .text()
    .trim()
  const twentyEightDayVisitsText = $('td:contains("28 Days")')
    .next()
    .next()
    .find('div.leading-5')
    .first()
    .text()
    .trim()

  const lifeTimeVisits = {
    text: lifeTimeVisitsText,
    number: parseVisits({ visitsText: lifeTimeVisitsText }).number,
  }

  const sevenDayVisits = {
    text: sevenDayVisitsText,
    number: parseVisits({ visitsText: sevenDayVisitsText }).number,
  }

  const dailyVisits = {
    text: (sevenDayVisits.number / 7).toLocaleString('en-US', {
      maximumFractionDigits: 2,
    }),
    number: Math.ceil(sevenDayVisits.number / 7),
  }

  const twentyEightDayVisits = {
    text: twentyEightDayVisitsText,
    number: parseVisits({ visitsText: twentyEightDayVisitsText }).number,
  }

  const playingNow = {
    number: Number($('.text-purple-400:contains("Playing Now")').next().text().trim()),
  }

  const developer = $('.text-purple-400:contains("Developer")').next().text().trim()

  const created = $('.text-purple-400:contains("Created")').next().text().trim()

  return {
    lifeTimeVisits,
    dailyVisits,
    sevenDayVisits,
    twentyEightDayVisits,
    playingNow,
    developer,
    created,
  }
}

export type OffpathScrapeGamePageReturn = ReturnType<typeof offpathScrapeGamePage>

function parseVisits(props: { visitsText: string }) {
  let number = 0

  if (props.visitsText.endsWith('B')) {
    number = Number(parseFloat(props.visitsText) * 1_000_000_000)
  } else if (props.visitsText.endsWith('M')) {
    number = Number(parseFloat(props.visitsText) * 1_000_000)
  } else if (props.visitsText.endsWith('K')) {
    number = Number(parseFloat(props.visitsText) * 1_000)
  } else {
    number = Number(parseFloat(props.visitsText))
  }

  number = Math.ceil(number)

  return {
    number,
  }
}
