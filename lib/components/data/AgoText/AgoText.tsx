import React from 'react'
import type { TextProps } from '@useweb/ui/Text'
import Text from '@useweb/ui/Text'
import relativeTime from 'dayjs/plugin/relativeTime'
import { dayjs } from '@useweb/date'

dayjs.extend(relativeTime)

export type AgoTextProps = { date: number | undefined | string; sx?: TextProps['sx'] }

export default function AgoText(props: AgoTextProps) {
  if (!props.date) return null

  const sentDateRelativeToToday = getAgoText({ date: props.date }).agoText

  return (
    <Text
      text={sentDateRelativeToToday}
      sx={{
        color: 'neutral.200',
        fontWeight: 600,
        fontSize: '11px',
        lineHeight: `16px`,
        textAlign: `left`,
        ...(props.sx || {}),
      }}
    />
  )
}

export const getAgoText = (props: { date: AgoTextProps['date'] }) => {
  const sentDateRelativeToToday = props.date
    ? dayjs(props.date).fromNow(true) + ' ago'
    : ''

  return {
    agoText: sentDateRelativeToToday,
  }
}
