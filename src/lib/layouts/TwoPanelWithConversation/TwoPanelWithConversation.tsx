import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'

export type TwoPanelWithConversationProps = {
  children: any
  sx?: BoxProps['sx']
  'data-id'?: string
}

export const twoPanelWithConversationHeight = [, , `calc(100vh - 120px)`]

export default function TwoPanelWithConversation(props: TwoPanelWithConversationProps) {
  return (
    <Box
      data-id={props['data-id'] || 'TwoPanelWithConversation'}
      sx={{
        display: 'grid',
        gridTemplateColumns: [, , '1fr 270px'],
        border: [, , '2px solid'],
        borderColor: [, , 'neutral.300'],
        borderRadius: [, , '32px'],
        '& div[data-id="Conversations"]': {
          height: twoPanelWithConversationHeight,
        },
        ...(props.sx || {}),
      }}
    >
      {props.children}
    </Box>
  )
}
