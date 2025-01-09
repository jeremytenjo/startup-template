import assert from '@useweb/assert'

import getAllUnseenConversationMessagesFromUid from '../../../conversations/queries/getAllUnseenConversationMessagesFromUid/getAllUnseenConversationMessagesFromUid.js'
import type MessageSchema from '../../message.schema.js'

export type GetAllUnseenMessagesProps = { uid: string }

export default async function getAllUnseenMessages(props: GetAllUnseenMessagesProps) {
  assert({ props })

  // unseen messages from direct messages
  const allUnseenConversationMessages = await getAllUnseenConversationMessagesFromUid({
    uid: props.uid,
  })

  const allUnseenMessages: MessageSchema[] = [...allUnseenConversationMessages]

  return allUnseenMessages
}

export type GetAllUnseenMessagesReturn = ReturnType<typeof getAllUnseenMessages>
