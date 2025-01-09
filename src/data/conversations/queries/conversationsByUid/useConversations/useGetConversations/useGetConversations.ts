import assert from '@useweb/assert'
import { type UseDataProps } from '@useweb/use-data'

import useAuth from '../../../../../users/utils/useAuth/useAuth.js'
import logError from '../../../../../../lib/utils/loggers/logError/logError.js'
import getLatestConvoMessage, {
  type GetLatestConvoMessageReturn,
} from '../../../getLatestConvoMessage/getLatestConvoMessage.js'
import getUserConversations from '../../../getUserConversations/getUserConversations.js'

// fetcher
export type GetConversationsProps = {
  uid: string
}

export type ConversationPreviewProps = GetLatestConvoMessageReturn

export const conversationsByUid = async (props: GetConversationsProps) => {
  assert({ props, requiredProps: ['uid'] })
  const conversations: ConversationPreviewProps[] = []

  const conversationsRaw = (await getUserConversations({ uid: props.uid })) || []

  await Promise.all(
    conversationsRaw.map(async (conversation) => {
      const otherMembersArray = conversation?.members || []
      const otherMemberUid = otherMembersArray.find((user) => user !== props.uid)

      if (!otherMemberUid) {
        throw new Error(`Could not find other member in conversation ${conversation.id}}`)
      }

      const latestMessage = await getLatestConvoMessage({
        conversation,
        uid: props.uid,
        otherMemberUid,
      })

      conversations.push(latestMessage)
    }),
  )

  return conversations
}

// hook
type useGetConversationsProps = UseDataProps<ConversationPreviewProps>['get']
type useGetConversationsReturn = UseDataProps<ConversationPreviewProps>['get']

export default function useGetConversations(
  props: useGetConversationsProps,
): useGetConversationsReturn {
  const auth = useAuth()

  const get: useGetConversationsReturn = {
    ...props,

    fetcher: conversationsByUid,
    fetcherPayload: {
      uid: auth.user?.id,
    },

    onGet: (result) => {
      props?.onGet && props.onGet(result)
    },

    onGetError: (error) => {
      logError({
        error: error.error,
        fnName: 'useGetConversations',
        metadata: { props },
      })
      props?.onGetError && props.onGetError(error)
    },
  }

  return get
}
