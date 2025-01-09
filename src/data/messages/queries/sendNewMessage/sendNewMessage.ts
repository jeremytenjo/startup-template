import assert from '@useweb/assert'
import { getToday } from '@useweb/date'
import type { UseAsyncProps } from '@useweb/use-async'
import useAsync from '@useweb/use-async'
import { collection, doc, setDoc } from 'firebase/firestore'

import { db } from '../../../../lib/integrations/Google/Firebase/firebase.js'
import logError from '../../../../lib/utils/loggers/logError/logError.js'
import { createConversation } from '../../../conversations/queries/conversationsByUid/useConversations/useCreateConversations/useCreateConversations.js'
import getConversationWithUid from '../../../conversations/queries/getConversationWithUid/getConversationWithUid.js'
import type MessageSchema from '../../message.schema.js'
import { messagesCollectionName } from '../../messages.config.js'
import sendEmailClient from '../../../../apiFunctions/sendEmail/sendEmail.client.js'
import sendNotification from '../../../notifications/queries/sendNotification/sendNotification.js'

type MessageUserSchema = {
  id: string
  email: string
  name: string
  photoURL: string
}

export type SendNewMessageProps = {
  sender: MessageUserSchema
  receiver: MessageUserSchema
  message: string
}

export default async function sendNewMessage(props: SendNewMessageProps) {
  assert({ props })
  let conversationId: string = undefined as any

  // 1. check if conversation exists
  const currentConversation = await getConversationWithUid({
    currentUid: props.sender.id,
    uid: props.receiver.id,
  })

  if (currentConversation?.id) {
    conversationId = currentConversation.id
  } else {
    // 2. if not, create new conversation
    // create conversation
    const { newItem: newConversation } = await createConversation({
      payload: {
        user1: props.sender.id,
        user2: props.receiver.id,
        type: 'direct',
        // prevents from running twice
        ignoreGetConversationWithUid: true,
      },
    })

    conversationId = newConversation.id
  }

  // 3. send message to conversation
  if (conversationId) {
    const newMessageDocRef = doc(collection(db, messagesCollectionName))
    const newMessage: MessageSchema = {
      id: newMessageDocRef.id,
      conversationId,
      senderUid: props.sender.id,
      body: props.message,
      sentDate: getToday(),
      seenBy: props.sender.id,
    }

    await setDoc(newMessageDocRef, newMessage)

    // 5 notify receiver

    // Message
    const message = {
      title: `New message from ${props.sender?.name}`,
      body: props.message,
      ctas: [
        {
          href: `/messages/${conversationId}`,
          label: 'View Message',
        },
      ],
    }

    // send notification
    try {
      await sendNotification({
        notification: {
          title: message.title,
          seen: false,
          senderUid: props.sender.id,
          receiverUid: props.receiver.id,
          sentDate: getToday(),
          imageUrl: props.sender.photoURL,
          message: message.body,
          ctas: message.ctas,
        },
      })
    } catch (error: any) {
      logError({
        error,
        fnName: 'sendNewMessage - sendNotification',
        metadata: { props },
      })
    }

    // send email
    try {
      await sendEmailClient({
        to: [props.receiver.email],
        from: 'notifications',
        subject: message.title,
        template: {
          props: {
            receiverName: props.receiver.name,
            senderImageUrl: props.sender?.photoURL,
            title: message.title,
            body: message.body,
            ctas: message.ctas,
          },
        },
      })
    } catch (error: any) {
      logError({
        error,
        fnName: 'sendNewMessage - sendEmailClient',
        metadata: { props },
      })
    }

    // 6. return message
    return newMessage
  } else {
    throw new Error('Could not create conversation to send new message')
  }
}

export type SendNewMessageReturn = ReturnType<typeof sendNewMessage>

type UseSendNewMessageProps = Partial<UseAsyncProps<SendNewMessageProps, MessageSchema>>

export const useSendNewMessage = (props: UseSendNewMessageProps = {}) => {
  const sendNewMessageRes = useAsync<SendNewMessageProps, MessageSchema>({
    fn: sendNewMessage,
    onError(props) {
      logError({
        error: props.error,
        fnName: 'useSendNewMessage',
        metadata: { props },
      })
    },
    ...props,
  })

  return sendNewMessageRes
}
