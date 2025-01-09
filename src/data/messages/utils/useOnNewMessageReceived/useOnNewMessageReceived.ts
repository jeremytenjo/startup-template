import { getToday } from '@useweb/date'
import { collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { useEffect } from 'react'

import useAuth from '../../../users/utils/useAuth/useAuth.js'
import { db } from '../../../../lib/integrations/Google/Firebase/firebase.js'
import logError from '../../../../lib/utils/loggers/logError/logError.js'
import type MessageSchema from '../../message.schema.js'
import { messagesCollectionName } from '../../messages.config.js'

import useHandleOtherUserMessage from './handlers/useHandleOtherUserMessage/useHandleOtherUserMessage.js'
import useUpdateLastMessageInConversationList from './handlers/useUpdateLastMessageInConversationList/useUpdateLastMessageInConversationList.js'

export type UseOnNewMessageReceivedProps = {
  conversationId: string | undefined
  // set to true in messages page
  disableConversationListUpdate?: boolean
  onNewMessageReceived?: (props: { newMessage: MessageSchema }) => void
}

export default function useOnNewMessageReceived(props: UseOnNewMessageReceivedProps) {
  const auth = useAuth()
  const updateLastMessageInConversationList = useUpdateLastMessageInConversationList()
  const handleOtherUserMessage = useHandleOtherUserMessage()

  useEffect(() => {
    if (props.conversationId) {
      const listenAfter = getToday()
      // listen to new messages
      const q = query(
        collection(db, messagesCollectionName),
        where('conversationId' satisfies keyof MessageSchema, '==', props.conversationId),
        where('sentDate' satisfies keyof MessageSchema, '>=', listenAfter),
        orderBy('sentDate' satisfies keyof MessageSchema, 'desc'),
        limit(1),
      )

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            if (change.type === 'added') {
              const newMessage: MessageSchema = change.doc.data() as MessageSchema
              const isCurrentUserMessage = newMessage.senderUid === auth.user?.id
              const isOtherUserMessage = !isCurrentUserMessage

              // handle system messages
              if (newMessage.isSystemMessage) {
                const currentUserIsSender = newMessage.senderUid === auth.user?.id
                if (currentUserIsSender) {
                  if (newMessage?.systemMessageProps?.showToSenderImmediately) {
                    handleOtherUserMessage.exec({
                      message: newMessage,
                    })
                    return
                  } else {
                    // dont show system messages sent by the current user to current user
                    return
                  }
                }
              }

              if (!props.disableConversationListUpdate) {
                // Update the latest message in the conversation list
                updateLastMessageInConversationList.exec({
                  message: newMessage,
                  isCurrentUserMessage,
                  isOtherUserMessage,
                })
              }

              // handle other user message
              if (isOtherUserMessage) {
                handleOtherUserMessage.exec({
                  message: newMessage,
                })
              }

              if (props.onNewMessageReceived) {
                props.onNewMessageReceived({
                  newMessage,
                })
              }
            }
          })
        },
        (error) => {
          logError({
            error,
            fnName: `useOnNewMessageReceived: Error listening to new messages for ${props.conversationId}`,
            metadata: { props },
          })
        },
      )

      return () => {
        unsubscribe()
      }
    }
  }, [props.conversationId])
}

export type UseOnNewMessageReceivedReturn = ReturnType<typeof useOnNewMessageReceived>
