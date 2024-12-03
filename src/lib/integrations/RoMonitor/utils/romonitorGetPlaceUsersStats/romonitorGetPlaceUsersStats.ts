import assert from '@useweb/assert'

import romonitorFetchPlaceData from '../romonitorFetchPlaceData/romonitorFetchPlaceData.js'

export type RomonitorGetPlaceUsersStatsProps = { placeId: number }

export default async function romonitorGetPlaceUsersStats(
  props: RomonitorGetPlaceUsersStatsProps,
) {
  assert<RomonitorGetPlaceUsersStatsProps>({ props, requiredProps: ['placeId'] })

  const lastMonthIso = new Date(new Date().setMonth(new Date().getMonth() - 1))
    .toISOString()
    .split('T')[0]
  const todayIso = new Date().toISOString().split('T')[0]

  const placeData = await romonitorFetchPlaceData({
    dataType: 'visits',
    placeId: props.placeId,
    startDateISO: lastMonthIso,
    endDateISO: todayIso,
  })

  const ratingData = placeData.data.find(
    (item): item is DataPoint => 'name' in item && item.name === 'Rating',
  )
  if (!ratingData) {
    throw new Error('Rating data not found')
  }

  const values = Object.values(ratingData.data)

  const ccu = values[values.length - 1] // Assuming the last value is the current CCU
  const dau = values.reduce((acc, value) => acc + value, 0) / values.length // Average of daily values
  const mau = values.reduce((acc, value) => acc + value, 0) / Math.min(values.length, 30) // Average of monthly values (or total if less than 30 days)

  return { ccu, dau, mau }
}

export type RomonitorGetPlaceUsersStatsReturn = ReturnType<
  typeof romonitorGetPlaceUsersStats
>

type DataPoint = {
  name: string
  data: Record<string, number>
  tooltipId: string
  plotBands: any[]
}
