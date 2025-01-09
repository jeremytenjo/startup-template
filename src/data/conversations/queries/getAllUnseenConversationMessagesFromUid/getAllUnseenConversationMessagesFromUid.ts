import assert from '@useweb/assert'

import { conversationsByUid } from '../conversationsByUid/useConversations/useGetConversations/useGetConversations.js'
import getUnseenMessagesFromConversation from '../getUnseenMessagesFromConversation/getUnseenMessagesFromConversation.js'
import type MessageSchema from '../../../messages/message.schema.js'

export type GetAllUidUnseenConversationMessagesProps = {
  uid: string
}

/**
 * Returns all unseen messages from all conversations from a uid
 */
export default async function getAllUnseenConversationMessagesFromUid(
  props: GetAllUidUnseenConversationMessagesProps,
) {
  assert({ props })
  let alluidUnseenConversationMessages: MessageSchema[] = []

  const conversations = await conversationsByUid({
    uid: props.uid,
  })

  await Promise.all(
    conversations.map(async (conversation) => {
      const otherUserUid = conversation.rawConversation.members.find(
        (member) => member !== props.uid,
      )
      if (!otherUserUid) {
        console.error(conversation)
        throw new Error("Couldn't find other user uid")
      }
      const conversationUnseenMessages = await getUnseenMessagesFromConversation({
        conversationId: conversation.id,
        otherUserUid,
      })

      alluidUnseenConversationMessages = [
        ...alluidUnseenConversationMessages,
        ...conversationUnseenMessages,
      ]
    }),
  )

  return alluidUnseenConversationMessages
}

export type GetAllUidUnseenConversationMessagesReturn = ReturnType<
  typeof getAllUnseenConversationMessagesFromUid
>
