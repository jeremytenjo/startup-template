import assert from '@useweb/assert'

import getUserConversations from '../getUserConversations/getUserConversations.js'

export type GetConversationWithUidProps = {
  currentUid: string
  uid: string
}

export default async function getConversationWithUid(props: GetConversationWithUidProps) {
  assert({ props })

  const allUserConversations = await getUserConversations({ uid: props.currentUid })
  const foundConversation = allUserConversations.find((convo) => {
    return convo.members.includes(props.uid) && convo.members.includes(props.currentUid)
  })

  return foundConversation
}

export type GetConversationWithUidReturn = ReturnType<typeof getConversationWithUid>
