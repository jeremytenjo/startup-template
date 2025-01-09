import React, { useEffect } from 'react'
import { useUsers } from '@useweb/firebase/useFirebaseAuth'

import useAuth from '../../../../../users/utils/useAuth/useAuth.js'
import useConversationData from '../../../../../conversations/queries/conversationsByUid/ui/Conversation/useConversationData/useConversationData.js'
import type MessageSchema from '../../../../message.schema.js'
import useMessagesList from '../../useMessagesList/useMessagesList.js'
import type UserSchema from '../../../../../users/user.schema.js'

import type { MessageUiProps } from './ui/MessageUi.js'
import MessageUi from './ui/MessageUi.js'

export type MessageProps = {
  messageData: MessageSchema
  allConversationMessages: MessageUiProps['allConversationMessages']
  messageIndex: MessageUiProps['messageIndex']
  showAvatar?: boolean
}

export default function Message(props: MessageProps) {
  const conversation = useConversationData()
  const auth = useAuth()
  const messages = useMessagesList()

  useEffect(() => {
    if (props.messageData.saveToFirestore) {
      messages.update.exec({ value: props.messageData })
    }
  }, [props.messageData.saveToFirestore])

  useEffect(() => {
    if (props.messageData.updateSeenByCurrentUser) {
      messages.update.exec({ value: props.messageData })
    }
  }, [props.messageData.updateSeenByCurrentUser])

  const sender = useUsers<UserSchema>({
    id: props.messageData.senderUid,
  })

  return (
    <MessageUi
      avatar={
        conversation?.messagesListProps?.showAvatar || props.showAvatar
          ? sender.user?.profilePhoto?.src
          : undefined
      }
      {...props.messageData}
      body={props.messageData.body}
      isSending={messages.update.loading}
      sentDate={props.messageData.sentDate}
      attachments={props.messageData.attachments || []}
      isMyMessage={auth.user?.id === props.messageData.senderUid}
      error={messages.update.error as any}
      isSystemMessage={props.messageData.isSystemMessage}
      ctas={props.messageData.ctas}
      systemMessageProps={props.messageData.systemMessageProps}
      moreText={props.messageData.moreText}
      allConversationMessages={props.allConversationMessages}
      messageIndex={props.messageIndex}
    />
  )
}
