import assert from '@useweb/assert'
import { useDataCache } from '@useweb/use-data'

import useAuth from '../../../../../users/utils/useAuth/useAuth.js'
import useConversations, {
  getConversationsId,
} from '../../../../../conversations/queries/conversationsByUid/useConversations/useConversations.js'
import type { ConversationPreviewProps } from '../../../../../conversations/queries/conversationsByUid/useConversations/useGetConversations/useGetConversations.js'
import type MessageSchema from '../../../../message.schema.js'

export type UseUpdateLastMessageInConversationListProps = {
  message: MessageSchema
  isCurrentUserMessage: boolean
  isOtherUserMessage: boolean
}

export default function useUpdateLastMessageInConversationList() {
  const dataCache = useDataCache()
  const conversationsList = useConversations()
  const auth = useAuth()

  const exec = (props: UseUpdateLastMessageInConversationListProps) => {
    assert({ props })

    // Update the latest message in the conversation list
    const currentConversation = conversationsList.get.data?.find(
      (c) => c.id === props.message.conversationId,
    )
    if (!currentConversation) {
      throw new Error(`Conversation doesn't exist ${props.message.conversationId} `)
    }

    const pageConversationId = location.pathname.split('/')[2]

    const messageConversationIsOpenInBrowser =
      currentConversation.id === pageConversationId && props.isOtherUserMessage

    const updatedConversationListItem: ConversationPreviewProps = {
      ...currentConversation,
      latestMessage: {
        message: {
          ...props.message,
          seenBy: messageConversationIsOpenInBrowser
            ? props.message?.senderUid + auth.user?.id
            : props.message?.senderUid,
        },
        otherMember: currentConversation.latestMessage.otherMember,
        isSentByCurrentUser: props.isCurrentUserMessage,
      },
    }

    dataCache.mutate<ConversationPreviewProps>({
      id: getConversationsId({
        uid: auth.user?.id,
      }),
      data: updatedConversationListItem,
      method: 'update',
    })
  }

  return { exec }
}

export type UseUpdateLastMessageInConversationListReturn = ReturnType<
  typeof useUpdateLastMessageInConversationList
>
