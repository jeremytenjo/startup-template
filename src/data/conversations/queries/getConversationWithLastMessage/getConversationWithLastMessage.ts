import assert from '@useweb/assert'

import type { GetLatestConvoMessageReturn } from '../getLatestConvoMessage/getLatestConvoMessage.js'

export type GetConversationWithLastMessageProps = {
  conversations?: GetLatestConvoMessageReturn[]
  currentUid: string
  uid: string
}

export default async function getConversationWithLastMessage(
  props: GetConversationWithLastMessageProps,
) {
  assert({ props })

  // check props coversations
  const conversation: GetLatestConvoMessageReturn | undefined = props.conversations?.find(
    (convo) => {
      return (
        convo.rawConversation.members.includes(props.uid) &&
        convo.rawConversation.members.includes(props.currentUid)
      )
    },
  )

  return conversation
}

export type GetConversationWithLastMessageReturn = ReturnType<
  typeof getConversationWithLastMessage
>
