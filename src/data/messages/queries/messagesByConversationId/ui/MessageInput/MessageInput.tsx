import React, { useEffect } from 'react'
import { type BoxProps } from '@useweb/ui/Box'

import useMessagesList from '../../useMessagesList/useMessagesList.js'
import type MessageSchema from '../../../../message.schema.js'
import useConversationData from '../../../../../conversations/queries/conversationsByUid/ui/Conversation/useConversationData/useConversationData.js'
import { scrollToBottomOfMessagesList } from '../MessagesList/MessagesListData/MessagesListData.js'
import { getMessagesLimit } from '../../useMessagesList/useGetMessagesList/useGetMessagesList.js'
import type ConversationSchema from '../../../../../conversations/conversation.schema.js'
import type { OnSendMessageProps } from '../../../../ui/MessageInputField/MessageInputField.js'
import MessageInputField from '../../../../ui/MessageInputField/MessageInputField.js'

export type MessageInputProps = {
  sx?: BoxProps['sx']
  preventScrollToBottomOfMessagesList?: boolean
  onNewMessageSent?: (props: {
    newMessage: MessageSchema
    conversation: ConversationSchema | undefined
  }) => any
}

export default function MessageInput(props: MessageInputProps) {
  const conversation = useConversationData()
  const messagesList = useMessagesList({
    createOptions: {
      onCreate: (p) => {
        if (props.onNewMessageSent) {
          props.onNewMessageSent({
            newMessage: p.result.createdItem,
            conversation: conversation.data.get.firstItem,
          })
        }
      },
    },
  })

  const sendMessage = (p: OnSendMessageProps) => {
    const isValidMessage = p.rawAttachments?.length || p.message !== ''
    if (!isValidMessage) return

    if (!conversation?.conversationId) {
      throw new Error('conversation.conversationId is undefined')
    }

    const newMessage: MessageSchema = {
      id: `temp${Math.random()}`,
      conversationId: conversation?.conversationId,
      senderUid: conversation?.uid,
      body: p.message,
      rawAttachments: p.rawAttachments,
      // replace with false after saved in firestore
      saveToFirestore: true,
      sentDate: p.sentDate,
      seenBy: conversation?.uid,
    }

    messagesList.create.exec({
      newItem: newMessage,
    })
  }

  useEffect(() => {
    if (messagesList.get.data.length <= getMessagesLimit) {
      // ensures all li items are rendered before scrolling to bottom
      setTimeout(() => {
        if (!props.preventScrollToBottomOfMessagesList) {
          scrollToBottomOfMessagesList({
            scrollBehavior: 'auto',
          })
        }
      }, 10)
    }
  }, [messagesList.get.data])

  const conversationNotFound = conversation?.data.get.dataIsEmpty
  const disableInput = Boolean(messagesList.get.error || messagesList.get.fetching)

  if (
    conversation?.data.get.error ||
    conversationNotFound ||
    conversation?.data.get.fetching
  ) {
    return null
  }

  return (
    <MessageInputField
      disableInput={disableInput}
      onSendMessage={sendMessage}
      recipientName={conversation?.otherUsers?.get.data?.[0]?.displayName}
      sx={{
        backgroundColor: 'neutral.600',
        pb: '15px',
        px: '12px',
        alignItems: 'end',
        ...props.sx,
      }}
      lastMessageSentDate={
        messagesList.get.data?.[messagesList.get?.data?.length - 1]?.sentDate
      }
    />
  )
}
