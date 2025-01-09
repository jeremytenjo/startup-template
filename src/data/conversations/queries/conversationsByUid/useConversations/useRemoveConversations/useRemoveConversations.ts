import { type UseDataProps, type RemoverProps } from '@useweb/use-data'

import logError from '../../../../../../lib/utils/loggers/logError/logError.js'
import { type ConversationPreviewProps } from '../useGetConversations/useGetConversations.js'

export type RemoveConversationsProps = RemoverProps<ConversationPreviewProps>

// remover
export const removeConversations = async (props: RemoveConversationsProps) => {
  console.log(props)
}

// hook
type useRemoveConversationsProps = UseDataProps<ConversationPreviewProps>['remove']
type useRemoveConversationsReturn = UseDataProps<ConversationPreviewProps>['remove']

export default function useRemoveConversations(
  props: useRemoveConversationsProps,
): useRemoveConversationsReturn {
  const remove: useRemoveConversationsReturn = {
    remover: removeConversations,

    onRemove: (result) => {
      props?.onRemove && props.onRemove(result)
    },

    onRemoveError: (error) => {
      logError({
        error: error.error,
        fnName: 'useRemoveConversations',
        metadata: { props },
      })
      props?.onRemoveError && props.onRemoveError(error)
    },
  }

  return remove
}
