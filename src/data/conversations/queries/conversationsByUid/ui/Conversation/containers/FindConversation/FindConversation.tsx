import React from 'react'
import Box from '@useweb/ui/Box'
import { useRouter } from 'next/router'
import useData from '@useweb/use-data'
import ErrorMessage from '@useweb/ui/ErrorMessage'

import useAuth from '../../../../../../../users/utils/useAuth/useAuth.js'
import type { GetConversationWithUidProps } from '../../../../../getConversationWithUid/getConversationWithUid.js'
import useConversations from '../../../../useConversations/useConversations.js'
import ConversationStatusMessage from '../../../../../../../messages/queries/messagesByConversationId/ui/_common/ConversationStatusMessage/ConversationStatusMessage.js'
import type { GetLatestConvoMessageReturn } from '../../../../../getLatestConvoMessage/getLatestConvoMessage.js'
import getConversationWithLastMessage from '../../../../../getConversationWithLastMessage/getConversationWithLastMessage.js'
import logError from '../../../../../../../../lib/utils/loggers/logError/logError.js'

export type FindConversationProps = { uid?: string }

export default function FindConversation(props: FindConversationProps) {
  const router = useRouter()
  const auth = useAuth()

  const currentUserUid = auth.user?.id
  const otherUserUid = props?.uid

  const conversationsList = useConversations({
    createOptions: {
      onCreate(props) {
        const result = props.result
        router.replace(`/messages/${result.createdItem?.id}`)
      },
    },
  })

  const foundConversation = useData<
    GetLatestConvoMessageReturn,
    GetConversationWithUidProps
  >({
    id: auth.user?.id && `conversation/found/${props?.uid}`,
    get: {
      fetcher: async () => {
        const foundConvo = await getConversationWithLastMessage({
          conversations: conversationsList.get.data,
          uid: props?.uid as string,
          currentUid: auth.user?.id as string,
        })
        // allow to return undefined so taht onGet can create a new conversation
        return [foundConvo as GetLatestConvoMessageReturn]
      },
      onGet(props) {
        const foundConversation = props.result[0]

        if (foundConversation) {
          router.replace(`/messages/${foundConversation.id}`)
        } else {
          // create conversation
          conversationsList.create.exec({
            payload: {
              type: 'direct',
              user1: currentUserUid as string,
              user2: otherUserUid as string,
            },
          })
        }
      },
      onGetError(p) {
        logError({
          error: p.error,
          fnName: 'FindConversation data.get',
          metadata: { ...p },
        })
      },
    },
  })

  const error = foundConversation.get.error || conversationsList.create.error
  const loading = foundConversation.get.fetching || conversationsList.create.loading

  return (
    <Wrapper>
      {error && <ErrorMessage error={error} message={`Error loading conversation`} />}

      {loading && (
        <ConversationStatusMessage
          text={`Loading conversation`}
          sx={{
            pt: '20px',
          }}
        />
      )}
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='FindConversation'
      sx={{
        width: '100%',
      }}
    >
      {children}
    </Box>
  )
}
