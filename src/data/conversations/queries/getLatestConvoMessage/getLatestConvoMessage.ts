import assert from '@useweb/assert'
import { getUserFromFirestore } from '@useweb/firebase/useFirebaseAuth'
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore'

import { db } from '../../../../lib/integrations/Google/Firebase/firebase.js'
import type MessageSchema from '../../../messages/message.schema.js'
import { messagesCollectionName } from '../../../messages/messages.config.js'
import type UserSchema from '../../../users/user.schema.js'
import type ConversationSchema from '../../conversation.schema.js'

export type GetLatestConvoMessageProps = {
  conversation: ConversationSchema
  uid: string
  otherMemberUid: string
}

export type GetLatestConvoMessageReturn = {
  id: string
  latestMessage: {
    message: MessageSchema | undefined
    isSentByCurrentUser: boolean
    otherMember: UserSchema
  }
  rawConversation: ConversationSchema
}

export default async function getLatestConvoMessage(
  props: GetLatestConvoMessageProps,
): Promise<GetLatestConvoMessageReturn> {
  assert({ props })

  let latestMessageData: MessageSchema = undefined as any

  const q = query(
    collection(db, messagesCollectionName),
    where('conversationId' satisfies keyof MessageSchema, '==', props.conversation.id),
    orderBy('sentDate' satisfies keyof MessageSchema, 'desc'),
    limit(1),
  )

  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      latestMessageData = doc.data() as MessageSchema
    })
  }

  const otherMember = await getUserFromFirestore({
    id: props.otherMemberUid,
  })

  const isSentByCurrentUser = latestMessageData?.senderUid === props.uid

  const latestConvo: GetLatestConvoMessageReturn = {
    rawConversation: props.conversation,
    id: props.conversation.id,
    latestMessage: {
      message: latestMessageData as MessageSchema | undefined,
      isSentByCurrentUser,
      otherMember: otherMember as UserSchema,
    },
  }

  return latestConvo
}
