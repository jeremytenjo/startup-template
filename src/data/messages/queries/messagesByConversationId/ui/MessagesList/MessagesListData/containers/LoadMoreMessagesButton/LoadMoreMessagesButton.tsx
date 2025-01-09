import React from 'react'
import Box from '@useweb/ui/Box'
import Button from '@useweb/ui/Button'
import Text from '@useweb/ui/Text'
import useAsync from '@useweb/use-async'
import ErrorMessage from '@useweb/ui/ErrorMessage'

import useMessagesList from '../../../../../useMessagesList/useMessagesList.js'
import useconversationMessagesCursorTrackerStore from '../../../../../../../utils/conversationMessagesCursorTracker/useConversationMessagesCursorTrackerStore.js'
import useConversationData from '../../../../../../../../conversations/queries/conversationsByUid/ui/Conversation/useConversationData/useConversationData.js'
import {
  getMessagesLimit,
  getMessagesList,
} from '../../../../../useMessagesList/useGetMessagesList/useGetMessagesList.js'
import { scrollToTopOfMessagesList } from '../../MessagesListData.js'
import logError from '../../../../../../../../../lib/utils/loggers/logError/logError.js'

export default function LoadMoreMessagesButton() {
  const conversation = useConversationData()
  const messages = useMessagesList()
  const conversationMessagesCursorTrackerStore =
    useconversationMessagesCursorTrackerStore()

  const lastVisible =
    conversationMessagesCursorTrackerStore.trackerMatrix[
      conversation?.conversationId as string
    ]?.lastVisible

  const loadMoreMessages = useAsync({
    fn: async () => {
      if (!conversation.conversationId) {
        throw new Error('conversation.conversationId is undefined')
      }

      const trackerMatrix = conversationMessagesCursorTrackerStore.trackerMatrix
      const { lastVisible } = trackerMatrix[conversation.conversationId]
      const moreMessages = await getMessagesList({
        conversationId: conversation.conversationId,
        lastVisible,
        currentUserUid: undefined,
      })

      const allMessages = [...moreMessages, ...messages.get.data]

      messages.mutate({
        newData: allMessages,
      })
    },
    onResult() {
      scrollToTopOfMessagesList()
    },
    onError(props) {
      logError({
        error: props.error,
        fnName: 'loadMoreMessages',
        metadata: { props },
      })
    },
  })

  if (loadMoreMessages.error) {
    return (
      <ErrorMessage
        error={loadMoreMessages.error}
        message={'Error loading more messages'}
        sx={{
          textAlign: 'center',
          fontSize: ['11px', '13px'],
          mb: 2,
        }}
      />
    )
  }

  if (loadMoreMessages.loading) {
    return (
      <Text
        text={`Loading more messages`}
        sx={{
          textAlign: 'center',
          fontSize: ['11px', '13px'],
          color: 'neutral.200',
          mb: 2,
        }}
      />
    )
  }

  return messages.get.data.length > getMessagesLimit - 1 && lastVisible ? (
    <Box
      component={'li'}
      data-id='LoadMoreMessagesButton'
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        mb: 2,
      }}
    >
      <Button
        onClick={loadMoreMessages.exec}
        name='load more messages'
        sx={{
          width: 'fit-content',
        }}
      >
        Load More
      </Button>
    </Box>
  ) : null
}
