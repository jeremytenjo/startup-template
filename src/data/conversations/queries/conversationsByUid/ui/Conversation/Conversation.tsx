import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import { useRouter } from 'next/router'
import EmptyMessage from '@useweb/ui/EmptyMessage'

import type UserSchema from '../../../../../users/user.schema.js'
import MessagesList from '../../../../../messages/queries/messagesByConversationId/ui/MessagesList/MessagesList.js'
import useAuth from '../../../../../users/utils/useAuth/useAuth.js'
import MessageInput, {
  type MessageInputProps,
} from '../../../../../messages/queries/messagesByConversationId/ui/MessageInput/MessageInput.js'
import MessagesNotSelected from '../../../../../messages/ui/MessagesNotSelected/MessagesNotSelected.js'
import useConversations from '../../useConversations/useConversations.js'
import { rootLayoutConfig } from '../../../../../../lib/layouts/RootLayout/rootLayout.config.js'

import FindConversation from './containers/FindConversation/FindConversation.js'
import useConversationData, {
  ConversationDataProvider,
} from './useConversationData/useConversationData.js'
import ConversationHeader from './containers/ConversationHeader/ConversationHeader.js'

export type ConversationProps = {
  conversationId: string | undefined
  uid: UserSchema['id']
  onMenuIconClick?: () => any
  showEmptyBanner?: boolean
  onOtherUserLoaded?: (props: { otherUser: UserSchema }) => any
  hideHeader?: boolean
  hideMessageInput?: boolean
  sx?: BoxProps['sx']
  messagesListProps?: {
    showAvatar?: boolean
  }
  messagesInputProps?: MessageInputProps
}

export default function Conversation(props: ConversationProps) {
  return (
    <ConversationDataProvider props={props}>
      <ConversationUi {...props} />
    </ConversationDataProvider>
  )
}

function ConversationUi(props: ConversationProps) {
  const auth = useAuth()
  const conversation = useConversationData()
  const conversations = useConversations()
  const router = useRouter()

  const { find: findConversation } = router.query
  const isMessageIndexPage = router.pathname === '/messages'

  const userHasConversations = Boolean(conversations.get.data.length)

  const showNoConversationSelected = findConversation
    ? null
    : props.showEmptyBanner && !props.conversationId && !userHasConversations

  if (auth.isUserSignedOutAfterInitialAuthAttempt) {
    return (
      <ErrorMessage
        error={auth.isUserSignedOutAfterInitialAuthAttempt}
        message='You must be signed in to access this conversation'
      />
    )
  }

  return (
    <Box
      data-id='Conversation'
      sx={{
        gridTemplateRows: ['1fr auto', , 'auto 1fr auto'],
        overflow: 'hidden',
        display: 'grid',
        // mobile height
        position: ['fixed', , 'relative'],
        top: [rootLayoutConfig.mobileHeaderHeight, , 0],
        bottom: '0',
        left: '0',
        right: '0',
        height: [, , '100%'],
        minHeight: rootLayoutConfig.mobileHeaderHeight,
        backgroundColor: 'neutral.500',
        ...(conversation.sx || {}),
      }}
    >
      {findConversation && <FindConversation uid={findConversation as string} />}

      {!props.hideHeader && <ConversationHeader />}

      {props.conversationId && (
        <>
          <MessagesList />
          {!props.hideMessageInput && conversation.data.get.data.length > 0 && (
            <MessageInput {...props.messagesInputProps} />
          )}
        </>
      )}

      {conversation.data.get.error && (
        <EmptyMessage
          title='Chat not found'
          link={{
            href: '/messages',
            label: 'Go to messages',
          }}
          sx={{
            my: 2,
          }}
        />
      )}

      {/* No conversations started message */}
      {conversation.data.get.fetching ? null : showNoConversationSelected ? (
        <Box
          data-id='Message'
          sx={{
            justifySelf: 'center',
            alignSelf: 'center',
          }}
        >
          <MessagesNotSelected noConversations />
        </Box>
      ) : isMessageIndexPage ? (
        <Box
          data-id='Message'
          sx={{
            justifySelf: 'center',
            alignSelf: 'center',
          }}
        >
          <MessagesNotSelected />
        </Box>
      ) : null}
    </Box>
  )
}
