import useData, { type UseDataProps } from '@useweb/use-data'

import useAuth from '../../../../users/utils/useAuth/useAuth.js'

import useGetConversations, {
  type ConversationPreviewProps,
  type GetConversationsProps,
} from './useGetConversations/useGetConversations.js'
import useCreateConversations, {
  type CreateConversationsPayloadProps,
} from './useCreateConversations/useCreateConversations.js'
import useUpdateConversations, {
  type UpdateConversationsProps,
} from './useUpdateConversations/useUpdateConversations.js'
import useRemoveConversations from './useRemoveConversations/useRemoveConversations.js'

export type UseConversationsProps = {
  getOptions?: UseDataProps<ConversationPreviewProps, GetConversationsProps>['get']
  createOptions?: UseDataProps<ConversationPreviewProps>['create']
  updateOptions?: UseDataProps<
    ConversationPreviewProps,
    UpdateConversationsProps
  >['update']
  removeOptions?: UseDataProps<ConversationPreviewProps>['remove']
}

export default function useConversations(props: UseConversationsProps = {}) {
  const auth = useAuth()

  const get = useGetConversations(props?.getOptions)
  const create = useCreateConversations(props?.createOptions)
  const update = useUpdateConversations(props?.updateOptions)
  const remove = useRemoveConversations(props?.removeOptions)

  const conversations = useData<
    ConversationPreviewProps,
    GetConversationsProps,
    CreateConversationsPayloadProps,
    UpdateConversationsProps
  >({
    id: auth?.user?.id
      ? getConversationsId({
          uid: auth.user?.id,
        })
      : undefined,
    get,
    create,
    update,
    remove,
  })

  return conversations
}

export const getConversationsId = (props: { uid: string }) => {
  return `conversations/${props.uid}`
}
