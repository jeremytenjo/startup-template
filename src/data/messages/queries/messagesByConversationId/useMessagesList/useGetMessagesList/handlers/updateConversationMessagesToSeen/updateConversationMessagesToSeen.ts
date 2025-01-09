import assert from '@useweb/assert'
import { doc, updateDoc } from 'firebase/firestore'

import { db } from '../../../../../../../../lib/integrations/Google/Firebase/firebase.js'
import type MessageSchema from '../../../../../../message.schema.js'
import { messagesCollectionName } from '../../../../../../messages.config.js'

export type UpdateConversationMessagesToSeenProps = {
  messages: MessageSchema[]
  currentUserUid: string
}

export default async function updateConversationMessagesToSeen(
  props: UpdateConversationMessagesToSeenProps,
) {
  assert({ props })
  const messages = await Promise.all(
    props.messages.map(async (message) => {
      const isNotSeen = !message.seenBy?.includes(props.currentUserUid)
      const notSentByCurrentUser = message.senderUid !== props.currentUserUid

      if (!message.id) {
        throw new Error('Message id is not defined')
      }

      if (isNotSeen && message.id && notSentByCurrentUser) {
        const seenBy: MessageSchema['seenBy'] =
          (message.seenBy || '') + props.currentUserUid

        const newDocRef = doc(db, messagesCollectionName, message.id)
        await updateDoc(newDocRef, {
          seenBy,
        })

        const uMessage = {
          ...message,
          seenBy,
        }

        return uMessage
      }

      return message
    }),
  )

  return messages
}

export type UpdateConversationMessagesToSeenReturn = ReturnType<
  typeof updateConversationMessagesToSeen
>
