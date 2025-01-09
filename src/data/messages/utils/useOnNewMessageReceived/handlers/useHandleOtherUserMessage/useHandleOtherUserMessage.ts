import assert from '@useweb/assert'
import { useDataCache } from '@useweb/use-data'

import useAuth from '../../../../../users/utils/useAuth/useAuth.js'
import type MessageSchema from '../../../../message.schema.js'
import { getMessagesList } from '../../../../queries/messagesByConversationId/useMessagesList/useGetMessagesList/useGetMessagesList.js'
import { getMesagesListId } from '../../../../queries/messagesByConversationId/useMessagesList/useMessagesList.js'

export type UseHandleOtherUserMessageProps = { message: MessageSchema }

export default function useHandleOtherUserMessage() {
  const dataCache = useDataCache()
  const auth = useAuth()

  // add incoming message to conversation messages list
  const exec = async (props: UseHandleOtherUserMessageProps) => {
    assert({ props })

    const newItem: MessageSchema = {
      ...props.message,
      updateSeenByCurrentUser: true,
    }

    const messagesListId = getMesagesListId({
      conversationId: newItem.conversationId,
      uid: auth.user?.id,
    })

    const currentMessagesList = dataCache.getData<MessageSchema>({
      id: getMesagesListId({
        conversationId: newItem.conversationId,
        uid: auth.user?.id,
      }),
    })

    const isDataEmpty = !Boolean(currentMessagesList?.length)

    if (isDataEmpty) {
      // if messages empty fetch messages from firestore and overwrite messages
      const conversationMessages = await getMessagesList({
        conversationId: newItem.conversationId,
        currentUserUid: auth.user?.id,
      })

      dataCache.override({
        id: messagesListId,
        data: conversationMessages,
      })
    } else {
      const isNewMessageinConversationList = Boolean(
        currentMessagesList?.find((message) => message.id === newItem.id),
      )

      if (!isNewMessageinConversationList) {
        // else add message to messages list
        dataCache.mutate<MessageSchema>({
          id: messagesListId,
          method: 'add',
          data: newItem,
        })
      }
    }
  }

  return { exec }
}

export type UseHandleOtherUserMessageReturn = ReturnType<typeof useHandleOtherUserMessage>
