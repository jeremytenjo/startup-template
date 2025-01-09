import assert from '@useweb/assert'
import { collection, query, where, getDocs } from 'firebase/firestore'

import { db } from '../../../../lib/integrations/Google/Firebase/firebase.js'
import type ConversationSchema from '../../conversation.schema.js'
import { conversationsCollectionName } from '../../conversations.config.js'

export type GetUserConversationsProps = { uid: string }

export default async function getUserConversations(props: GetUserConversationsProps) {
  assert({ props, requiredProps: ['uid'] })

  const conversations: ConversationSchema[] = []
  const type: ConversationSchema['type'] = 'direct'

  const q = query(
    collection(db, conversationsCollectionName),
    where(`members`, 'array-contains', props.uid),
    where('type', '==', type),
  )

  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    conversations.push(doc.data() as ConversationSchema)
  })

  return conversations
}

export type GetUserConversationsReturn = ReturnType<typeof getUserConversations>
