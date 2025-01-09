import React, { useEffect, useState } from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import date from '@useweb/date'
import Avatar from '@useweb/ui/Avatar'

import type MessageSchema from '../../../../../message.schema.js'

import SystemMessage from './components/SystemMessage/SystemMessage.js'
import MessageAttachmentsList from './components/MessageAttachmentsList/MessageAttachmentsList.js'

export type MessageUiProps = {
  avatar?: string
  isMyMessage: boolean
  isSending: boolean
  error: string | undefined
  ctas: MessageSchema['ctas'] | undefined
  systemMessageProps: MessageSchema['systemMessageProps']
  allConversationMessages: MessageSchema[]
  messageIndex: number
  title?: MessageSchema['title']
  body?: MessageSchema['body']
  moreText?: MessageSchema['moreText']
  sentDate?: MessageSchema['sentDate']
  attachments?: MessageSchema['attachments']
  isSystemMessage?: boolean
  isTheBloxMarketMessage?: MessageSchema['isTheBloxMarketMessage']
}

export default function MessageUi(props: MessageUiProps) {
  const [showStatus, setshowStatus] = useState(props.isSending)
  const showAvatar = props.avatar && !props.isMyMessage

  useEffect(() => {
    setshowStatus(props.isSending)
  }, [props.isSending])

  if (props.isSystemMessage) {
    return <SystemMessage {...props} />
  }

  return (
    <>
      <Box
        data-id='Message'
        sx={{
          m: props.isMyMessage ? '0 0 auto auto' : 'unset',
          maxWidth: '80%',
          width: 'fit-content',
        }}
      >
        <Box
          sx={{
            height: 'fit-content',
            ...(showAvatar
              ? {
                  display: 'flex',
                  gap: '8px',
                }
              : {}),
          }}
        >
          {showAvatar && (
            <Avatar
              src={props.avatar}
              alt={'user'}
              sx={{ width: '30px', height: '30px' }}
            />
          )}

          <Box
            onClick={() => setshowStatus(!showStatus)}
            sx={{
              bgcolor: props.isMyMessage ? 'transparent' : 'neutral.300',
              color: props.isMyMessage ? 'neutral.100' : 'neutral.100',
              border: '1px solid transparent',
              borderColor: props.isMyMessage ? 'neutral.300' : 'transparent',
              fontWeight: 400,
              p: '10px',
              borderRadius: '14px',
              fontSize: ['13px', '16px'],
              whiteSpace: 'pre-line',
              height: 'fit-content',
              wordBreak: 'break-all',
            }}
          >
            {props.attachments && Boolean(props.attachments.length) && (
              <MessageAttachmentsList
                attachments={props.attachments}
                sx={{
                  mb: Boolean(props.body) ? 1 : 0,
                }}
              />
            )}

            {props.body}
          </Box>
        </Box>
      </Box>

      {showStatus && !props.error && (
        <Box
          sx={{
            color: 'neutral.200',
          }}
        >
          {props.isSending && props.isMyMessage && (
            <Text
              text={`Sending...`}
              sx={{
                mt: '5px',
                fontSize: '12px',
                textAlign: 'end',
              }}
            />
          )}

          {props.sentDate && !props.isSending && (
            <Text
              text={date(props.sentDate).format('ddd h:mm A')}
              sx={{
                mt: '5px',
                fontSize: ['11px', '12px'],
                textAlign: props.isMyMessage ? 'end' : 'start',
              }}
            />
          )}
        </Box>
      )}

      {props.error && (
        <Text
          text={'Error sending message'}
          sx={{
            fontSize: '12px',
            color: 'semantic.error.100',
            textAlign: 'end',
          }}
        />
      )}
    </>
  )
}
