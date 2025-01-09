import useData from '@useweb/use-data'
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore'

import type MessageSchema from '../../../../messages/message.schema.js'
import { messagesCollectionName } from '../../../../messages/messages.config.js'
import { db } from '../../../../../lib/integrations/Google/Firebase/firebase.js'

export type UseGetLatestConvoMessageProps = { conversationId: string | undefined }

export default function useGetLatestConvoMessage(props: UseGetLatestConvoMessageProps) {
  const latestMessage = useData<MessageSchema>({
    id: props.conversationId ? `latestMessage/${props.conversationId}` : undefined,
    get: {
      fetcher: async () => {
        const latestMessageData: MessageSchema[] = []

        const q = query(
          collection(db, messagesCollectionName),
          where(
            'conversationId' satisfies keyof MessageSchema,
            '==',
            props.conversationId,
          ),
          orderBy('sentDate' satisfies keyof MessageSchema, 'desc'),
          limit(1),
        )

        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            latestMessageData.push(doc.data() as MessageSchema)
          })
        }

        return latestMessageData
      },
    },
  })

  return latestMessage
}

export type UseGetLatestConvoMessageReturn = ReturnType<typeof useGetLatestConvoMessage>
