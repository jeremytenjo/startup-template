import assert from '@useweb/assert'
import crossFetch from 'cross-fetch'

export type RomonitorFetchPlaceDataProps = {
  placeId: number
  dataType: 'visits' | 'ccus' | 'rating'
  // only supports the last 14 days
  startDateISO: string
  endDateISO: string
}

export type RomonitorFetchPlaceDataResponse = {
  data: Array<
    | {
        name: string
        data: Record<string, number>
        tooltipId: string
        plotBands: any[]
      }
    | {
        type: string
        lastUpdated: string
        expectedDelay: string
        range: {
          min: string
          max: string
        }
      }
  >
}

export default async function romonitorFetchPlaceData(
  props: RomonitorFetchPlaceDataProps,
): Promise<RomonitorFetchPlaceDataResponse> {
  assert<RomonitorFetchPlaceDataProps>({
    props,
    requiredProps: ['placeId', 'dataType', 'startDateISO', 'endDateISO'],
  })

  // throw error if the date range is more than 14 days
  const startDate = new Date(props.startDateISO)
  const endDate = new Date(props.endDateISO)
  const dateDiff = Math.abs(startDate.getTime() - endDate.getTime())

  if (dateDiff > 14 * 24 * 60 * 60 * 1000) {
    throw new Error('Date range must be 14 days or less')
  }

  const url = `https://romonitorstats.com/api/v1/charts/get?name=${props.dataType}&timeslice=day&placeId=${props.placeId}&includeExperienceName=false&start=${props.startDateISO}&ends=${props.endDateISO}`

  const res = await crossFetch(url).then((res) => res.json())

  const data: RomonitorFetchPlaceDataResponse = res

  return data
}

export type RomonitorFetchPlaceDataReturn = ReturnType<typeof romonitorFetchPlaceData>
