import assert from '@useweb/assert'

import useAuth from '../../../users/utils/useAuth/useAuth.js'
import useConversations from '../../queries/conversationsByUid/useConversations/useConversations.js'

export type UseSetLastConversationMessageToSeenProps = { conversationId: string }

export default function useSetLastConversationMessageToSeen() {
  const conversationsList = useConversations()
  const auth = useAuth()

  const exec = (props: UseSetLastConversationMessageToSeenProps) => {
    assert({ props })
    const currentConversation = conversationsList.get.data?.find(
      (c) => c.id === props.conversationId,
    )

    if (currentConversation?.latestMessage.message?.conversationId) {
      conversationsList.update.exec({
        value: {
          ...currentConversation,
          latestMessage: {
            ...currentConversation?.latestMessage,
            message: {
              ...currentConversation?.latestMessage?.message,
              seenBy:
                (currentConversation?.latestMessage?.message?.seenBy || '') +
                auth.user?.id,
            },
          },
        },
      })
    }
  }

  return { exec }
}

export type UseSetLastConversationMessageToSeenReturn = ReturnType<
  typeof useSetLastConversationMessageToSeen
>
