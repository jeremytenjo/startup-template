import { roundToNearestMinutes } from 'date-fns'
import format from 'date-fns/format/index.js'

// https://date-fns.org/v2.30.0/docs/roundToNearestMinutes
export default async function getTodaysDateToTheNearestTenMinute() {
  const nearest10Minute = roundToNearestMinutes(new Date(), {
    nearestTo: 10,
  })
  const year = format(nearest10Minute, 'yyyy')
  const month = format(nearest10Minute, 'MM')
  const day = format(nearest10Minute, 'dd')
  const hour = format(nearest10Minute, 'hh')
  const minute = format(nearest10Minute, 'mm')
  const second = format(nearest10Minute, 'ss')
  const time = `${year}-${month}-${day} ${hour}:${minute}:${second}`

  return { time }
}

export type GetTodaysDateToTheNearestTenMinuteReturn = ReturnType<
  typeof getTodaysDateToTheNearestTenMinute
>
