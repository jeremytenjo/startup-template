import useData, { type UseDataProps } from '@useweb/use-data'

import type MessageSchema from '../../../message.schema.js'
import useConversationData from '../../../../conversations/queries/conversationsByUid/ui/Conversation/useConversationData/useConversationData.js'

import useGetMessagesList, {
  type GetMessagesListProps,
} from './useGetMessagesList/useGetMessagesList.js'
import useCreateMessagesList, {
  type CreateMessagesListPayloadProps,
} from './useCreateMessagesList/useCreateMessagesList.js'
import useUpdateMessagesList, {
  type UpdaterPayloadProps,
} from './useUpdateMessagesList/useUpdateMessagesList.js'
import useRemoveMessagesList from './useRemoveMessagesList/useRemoveMessagesList.js'

export type UseMessagesListProps = {
  getOptions?: UseDataProps<MessageSchema, GetMessagesListProps>['get']
  createOptions?: UseDataProps<MessageSchema>['create']
  updateOptions?: UseDataProps<MessageSchema>['update']
  removeOptions?: UseDataProps<MessageSchema>['remove']
}

export default function useMessagesList(props?: UseMessagesListProps) {
  const conversation = useConversationData()

  const get = useGetMessagesList(props?.getOptions)
  const create = useCreateMessagesList(props?.createOptions)
  const update = useUpdateMessagesList(props?.updateOptions)
  const remove = useRemoveMessagesList(props?.removeOptions)

  const messages = useData<
    MessageSchema,
    GetMessagesListProps,
    CreateMessagesListPayloadProps,
    UpdaterPayloadProps
  >({
    id:
      conversation?.conversationId && conversation?.uid
        ? getMesagesListId({
            conversationId: conversation?.conversationId,
            uid: conversation?.uid,
          })
        : undefined,
    get,
    create,
    update,
    remove,
  })

  return messages
}

export const getMesagesListId = (props: { conversationId: string; uid: string }) => {
  return `messages/${props?.conversationId}/${props?.uid}`
}
