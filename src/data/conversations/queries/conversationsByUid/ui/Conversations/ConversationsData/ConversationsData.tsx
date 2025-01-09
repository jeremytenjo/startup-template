import React, { useMemo } from 'react'
import Box from '@useweb/ui/Box'
import { type UseDataUiComponentProps } from '@useweb/use-data-ui'
import { useRouter } from 'next/router'

import { type ConversationPreviewProps } from '../../../useConversations/useGetConversations/useGetConversations.js'

import ConversationPreviewItem from './ConversationPreviewItem/ConversationPreviewItem.js'

export type ConversationsDataProps =
  UseDataUiComponentProps<ConversationPreviewProps>['data']

export default function ConversationsData(props: ConversationsDataProps) {
  const data = props.data || []
  const router = useRouter()
  const dataSortedBySentDate = useMemo(
    () =>
      data.sort((a, b) => {
        // makes sure that conversations without messages are at the top
        const defaultDate = 9000000000000000000

        return (
          (b?.latestMessage?.message?.sentDate || defaultDate) -
          (a?.latestMessage?.message?.sentDate || defaultDate)
        )
      }),
    [data],
  )

  return (
    <Box data-id='ConversationsData' component={'ul'} sx={{}}>
      {dataSortedBySentDate.map((conversation) => {
        return (
          <Box key={conversation.id} component='li' sx={{}}>
            <ConversationPreviewItem
              conversation={conversation}
              isActive={router?.query?.conversationId === conversation.id}
            />
          </Box>
        )
      })}
    </Box>
  )
}
