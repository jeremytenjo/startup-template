import { type UseDataProps, type UpdaterProps } from '@useweb/use-data'

import logError from '../../../../../../lib/utils/loggers/logError/logError.js'
import { type ConversationPreviewProps } from '../useGetConversations/useGetConversations.js'

export type UpdateConversationsProps = any

// updater
export const updateConversations = async (
  props: UpdaterProps<ConversationPreviewProps, UpdateConversationsProps>,
) => {
  const updatedItem = props.value

  return {
    updatedItem,
  }
}

// hook
type useUpdateConversationsProps = UseDataProps<
  ConversationPreviewProps,
  UpdateConversationsProps
>['update']
type useUpdateConversationsReturn = UseDataProps<
  ConversationPreviewProps,
  UpdateConversationsProps
>['update']

export default function useUpdateConversations(
  props: useUpdateConversationsProps,
): useUpdateConversationsReturn {
  const update: useUpdateConversationsReturn = {
    updater: updateConversations,

    onUpdate: (result) => {
      props?.onUpdate && props.onUpdate(result)
    },

    onUpdateError: (error) => {
      logError({
        error: error.error,
        fnName: 'useUpdateConversations',
        metadata: { props },
      })
      props?.onUpdateError && props.onUpdateError(error)
    },
  }

  return update
}
