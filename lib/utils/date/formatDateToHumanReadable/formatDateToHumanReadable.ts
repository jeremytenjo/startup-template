import type { DateProps } from '@useweb/date'
import date, { formatDate } from '@useweb/date'

export type FormatDateToHumanReadableProps = {
  date: undefined | string | Date | DateProps
  showTime?: boolean
}

export default function formatDateToHumanReadable(props: FormatDateToHumanReadableProps) {
  let human: string | undefined = undefined

  if (props.date) {
    if (typeof props.date === 'number') {
      human = formatDate({
        date: props.date,
        format: `MMM DD, YYYY ${props.showTime ? 'h:mm a.' : ''}`,
      }).date
    } else {
      human = date(props.date).format(`MMM DD, YYYY ${props.showTime ? 'h:mm a.' : ''}`)
    }
  }

  return { human }
}

export type FormatDateToHumanReadableReturn = ReturnType<typeof formatDateToHumanReadable>
