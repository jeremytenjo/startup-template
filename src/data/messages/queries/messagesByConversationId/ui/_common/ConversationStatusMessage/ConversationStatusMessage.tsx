import React from 'react'
import type { TextProps } from '@useweb/ui/Text'
import Text from '@useweb/ui/Text'

export type ConversationStatusMessageProps = {
  text: string
  sx?: TextProps['sx']
}

export default function ConversationStatusMessage(props: ConversationStatusMessageProps) {
  return (
    <Text
      text={props.text}
      sx={{
        textAlign: 'center',
        fontSize: ['11px', '12px'],
        color: 'neutral.200',
        ...(props.sx || {}),
      }}
    />
  )
}
