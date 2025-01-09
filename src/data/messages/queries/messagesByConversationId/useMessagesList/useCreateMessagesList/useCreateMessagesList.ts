import { type UseDataProps, type CreatorProps } from '@useweb/use-data'

import logError from '../../../../../../lib/utils/loggers/logError/logError.js'
import type MessageSchema from '../../../../message.schema.js'

export type CreateMessagesListPayloadProps = {
  // use to add system message to firestore, dms are saved to firestore via useUpdateMessagesList in order to show the message immediatly to the user and show a sending state in the chat
  addToFirestore?: boolean
}

// creator
export const createMessagesList = async (
  props: CreatorProps<MessageSchema, CreateMessagesListPayloadProps>,
) => {
  if (!props.newItem) {
    throw new Error('Missing newItem prop')
  }

  const newItem: MessageSchema = props.newItem

  return { newItem }
}

// hook
type useCreateMessagesListProps = UseDataProps<MessageSchema>['create']
type useCreateMessagesListReturn = UseDataProps<MessageSchema>['create']

export default function useCreateMessagesList(
  props = {} as useCreateMessagesListProps,
): useCreateMessagesListReturn {
  const create: useCreateMessagesListReturn = {
    creator: createMessagesList,

    onCreate: (result) => {
      props?.onCreate && props?.onCreate(result)
    },

    onCreateError: (error) => {
      logError({
        error: error.error,
        fnName: 'useCreateMessagesList',
        metadata: { props },
      })
      props?.onCreateError && props?.onCreateError(error)
    },
  }

  return create
}
