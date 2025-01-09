import React from 'react'
import Box from '@useweb/ui/Box'
import Skeleton from '@useweb/ui/Skeleton'
import Text from '@useweb/ui/Text'

import { type ConversationPreviewItemUIProps } from '../../ConversationPreviewItem.js'
import AgoText from '../../../../../../../../../../lib/components/data/AgoText/AgoText.js'

import Chat from './containers/Chat/Chat.js'

export type DataContainerProps = ConversationPreviewItemUIProps

export default function DataContainer(props: ConversationPreviewItemUIProps) {
  return (
    <Box
      data-id='DataContainer'
      sx={{
        display: `grid`,
        alignContent: `center`,
        height: `100%`,
        backgroundColor: `rgba(0, 0, 0, 0)`,
        gridAutoFlow: `row`,
      }}
    >
      <Skeleton loading={props.loading}>
        <Name {...props} />
      </Skeleton>

      <Skeleton loading={props.loading}>
        <Chat {...props} />
      </Skeleton>
    </Box>
  )
}

function Name(props: ConversationPreviewItemUIProps) {
  return (
    <Box
      data-id='Name'
      sx={{
        display: `grid`,
        width: `100%`,
        backgroundColor: `rgba(0, 0, 0, 0)`,
        gridAutoFlow: `column`,
        justifyContent: `space-between`,
        gridGap: `2px`,
        alignItems: 'center',
      }}
    >
      <Text
        text={props.conversation?.latestMessage?.otherMember?.displayName}
        sx={{
          fontWeight: 600,
          fontSize: 14,
          lineHeight: `24px`,
          textAlign: `left`,
        }}
      />

      <AgoText date={props?.conversation?.latestMessage?.message?.sentDate as number} />
    </Box>
  )
}
