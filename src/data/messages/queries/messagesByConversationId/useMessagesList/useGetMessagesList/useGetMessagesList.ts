import assert from '@useweb/assert'
import type { FirestoreDocumentType } from '@useweb/firebase/useFirestore'
import { type UseDataProps } from '@useweb/use-data'
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore'

import useAuth from '../../../../../users/utils/useAuth/useAuth.js'
import { db } from '../../../../../../lib/integrations/Google/Firebase/firebase.js'
import logError from '../../../../../../lib/utils/loggers/logError/logError.js'
import useConversationData from '../../../../../conversations/queries/conversationsByUid/ui/Conversation/useConversationData/useConversationData.js'
import type MessageSchema from '../../../../message.schema.js'
import { messagesCollectionName } from '../../../../messages.config.js'
import { conversationMessagesCursorTrackerStore } from '../../../../utils/conversationMessagesCursorTracker/useConversationMessagesCursorTrackerStore.js'

import updateConversationMessagesToSeen from './handlers/updateConversationMessagesToSeen/updateConversationMessagesToSeen.js'

// fetcher
export type GetMessagesListProps = {
  conversationId: string
  currentUserUid: string | undefined
  lastVisible?: FirestoreDocumentType
}

export const getMessagesLimit = 20

export const getMessagesList = async (props: GetMessagesListProps) => {
  assert({ props, requiredProps: ['conversationId'] })
  let messages: MessageSchema[] = []

  let q = query(
    collection(db, messagesCollectionName),
    where('conversationId', '==', props.conversationId),
    orderBy('sentDate', 'desc'),
    limit(getMessagesLimit),
  )

  if (props.lastVisible) {
    q = query(
      collection(db, messagesCollectionName),
      where('conversationId', '==', props.conversationId),
      orderBy('sentDate', 'desc'),
      startAfter(props.lastVisible),
      limit(getMessagesLimit / 2),
    )
  }

  const documentSnapshots = await getDocs(q)
  const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]

  conversationMessagesCursorTrackerStore.getState().settrackerMatrix({
    key: props.conversationId,
    value: lastVisible,
  })

  documentSnapshots.forEach((doc) => {
    messages.push({
      ...(doc.data() as MessageSchema),
      id: doc.id,
    })
  })

  if (props.currentUserUid) {
    messages = await updateConversationMessagesToSeen({
      messages,
      currentUserUid: props.currentUserUid,
    })
  }

  return messages
}

// hook
type useGetMessagesListProps = UseDataProps<MessageSchema, GetMessagesListProps>['get']
type useGetMessagesListReturn = UseDataProps<MessageSchema, GetMessagesListProps>['get']

export default function useGetMessagesList(
  props = {} as useGetMessagesListProps,
): useGetMessagesListReturn {
  const conversation = useConversationData()
  const auth = useAuth()

  const get: useGetMessagesListReturn = {
    ...props,

    fetcherPayload: {
      conversationId: conversation?.conversationId as string,
      currentUserUid: auth.user?.id,
    },
    getOnMount: true,
    fetcher: getMessagesList,

    onGet: async (result) => {
      props?.onGet && props.onGet(result)
    },

    onGetError: (error) => {
      logError({
        error: error.error,
        fnName: 'useGetMessagesList',
        metadata: { props },
      })
      props?.onGetError && props.onGetError(error)
    },
  }

  return get
}
