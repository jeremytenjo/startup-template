import assert from '@useweb/assert'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'

import { messagesCollectionName } from '../../../messages/messages.config.js'
import { db } from '../../../../lib/integrations/Google/Firebase/firebase.js'
import type MessageSchema from '../../../messages/message.schema.js'

export type GetUnseenMessagesFromConversationProps = {
  conversationId: string
  otherUserUid: string
}

/**
 * It will return unseen messages from the user in the conversation that is NOT equal to otherUserUid. Only works for conversations between 2 users because it uses the otherUserUid to determine unseen messages from the current user. eg seenBy = user1 means developer1 has not seen the message, user1developer1 means developer1 has seen the message
 */
export default async function getUnseenMessagesFromConversation(
  props: GetUnseenMessagesFromConversationProps,
) {
  assert({ props })

  const unseenMessages: MessageSchema[] = []

  const q = query(
    collection(db, messagesCollectionName),
    where('conversationId', '==', props.conversationId),
    where('seenBy', '==', props.otherUserUid),
    orderBy('sentDate', 'desc'),
    limit(1),
  )

  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    unseenMessages.push(doc.data() as MessageSchema)
  })

  return unseenMessages
}

export type GetUnseenMessagesFromConversationReturn = ReturnType<
  typeof getUnseenMessagesFromConversation
>
