import { type UseDataProps, type RemoverProps } from '@useweb/use-data'

import logError from '../../../../../../lib/utils/loggers/logError/logError.js'
import type MessageSchema from '../../../../message.schema.js'

export type RemoveMessagesListProps = RemoverProps<MessageSchema>

// remover
export const removeMessagesList = async (props: RemoveMessagesListProps) => {
  console.log(props)
}

// hook
type useRemoveMessagesListProps = UseDataProps<MessageSchema>['remove']
type useRemoveMessagesListReturn = UseDataProps<MessageSchema>['remove']

export default function useRemoveMessagesList(
  props = {} as useRemoveMessagesListProps,
): useRemoveMessagesListReturn {
  const remove: useRemoveMessagesListReturn = {
    remover: removeMessagesList,

    onRemove: (result) => {
      props?.onRemove && props.onRemove(result)
    },

    onRemoveError: (error) => {
      logError({
        error: error.error,
        fnName: 'useRemoveMessagesList',
        metadata: { props },
      })
      props?.onRemoveError && props.onRemoveError(error)
    },
  }

  return remove
}
