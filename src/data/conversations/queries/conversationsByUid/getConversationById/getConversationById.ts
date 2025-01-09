import assert from '@useweb/assert'
import { doc, getDoc } from 'firebase/firestore'

import { db } from '../../../../../lib/integrations/Google/Firebase/firebase.js'
import type ConversationSchema from '../../../conversation.schema.js'
import { conversationsCollectionName } from '../../../conversations.config.js'

export type GetConversationByIdProps = { conversationId: string }

export default async function getConversationById(props: GetConversationByIdProps) {
  assert({ props })

  let data: ConversationSchema | undefined = undefined
  const docRef = doc(db, conversationsCollectionName, props.conversationId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    data = docSnap.data() as ConversationSchema
  }

  return data
}

export type GetConversationByIdReturn = ReturnType<typeof getConversationById>
