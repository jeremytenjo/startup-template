import assert from '@useweb/assert'
import date from '@useweb/date'

export type GenMessageSendDateValueProps = { dateString: string }

export default function genMessageSendDateValue(props: GenMessageSendDateValueProps) {
  assert({ props })

  const messagesenddatevalue = Date.parse(date(props.dateString).toISOString())

  return messagesenddatevalue
}

export type GenMessageSendDateValueReturn = ReturnType<typeof genMessageSendDateValue>
