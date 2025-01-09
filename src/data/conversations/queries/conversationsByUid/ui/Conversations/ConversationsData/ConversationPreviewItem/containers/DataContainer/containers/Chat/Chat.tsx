import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

import { type ConversationPreviewItemUIProps } from '../../../../ConversationPreviewItem.js'
import useAuth from '../../../../../../../../../../../users/utils/useAuth/useAuth.js'

export type ChatProps = ConversationPreviewItemUIProps

export default function Chat(props: ChatProps) {
  const auth = useAuth()

  const unseenCount = !props.conversation?.latestMessage?.message
    ? false
    : !props.conversation?.latestMessage?.message?.seenBy?.includes(auth?.user?.id) &&
      props.conversation?.latestMessage?.message?.senderUid !== auth?.user?.id
    ? '1'
    : false

  return (
    <Wrapper>
      <Text
        text={
          Boolean(props.conversation?.latestMessage?.message?.attachments?.length)
            ? `Attachment`
            : !props.conversation?.latestMessage?.message?.body
            ? 'Start conversation'
            : props.conversation?.latestMessage?.isSentByCurrentUser
            ? `You: ${props.conversation?.latestMessage?.message?.body}`
            : props.conversation?.latestMessage?.message?.body || 'Start conversation'
        }
        sx={{
          fontWeight: 400,
          fontSize: 13,
          lineHeight: '20px',
          textAlign: 'left',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          color: 'neutral.100',
        }}
      />
      <UnseenMessageIndicator count={unseenCount} />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='Chat'
      sx={{
        display: 'grid',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        gridAutoFlow: 'column',
        justifyContent: 'space-between',
        gridGap: '2px',
      }}
    >
      {children}
    </Box>
  )
}

const UnseenMessageIndicator = (props: { count: boolean | number | string }) => {
  return props.count ? (
    <Box
      data-id='UnseenMessageIndicator'
      sx={{
        backgroundColor: 'primary.main',
        border: '1px solid',
        borderColor: 'primary.light',
        color: 'neutral.100',
        width: '22px',
        height: '22px',
        display: 'flex',
        placeContent: 'center',
        borderRadius: '100px',
        fontSize: '10px',
        fontWeight: 600,
        alignItems: 'center',
      }}
    >
      {props.count || 1}
    </Box>
  ) : null
}
