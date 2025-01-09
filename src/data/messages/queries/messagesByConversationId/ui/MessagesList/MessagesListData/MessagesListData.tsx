import React, { useMemo } from 'react'
import Box from '@useweb/ui/Box'
import { type UseDataUiComponentProps } from '@useweb/use-data-ui'

import type MessageSchema from '../../../../../message.schema.js'
import type { MessageProps } from '../../Message/Message.js'
import Message from '../../Message/Message.js'
import logError from '../../../../../../../lib/utils/loggers/logError/logError.js'
import { systemMessageId } from '../../../../../messages.config.js'

import LoadMoreMessagesButton from './containers/LoadMoreMessagesButton/LoadMoreMessagesButton.js'

export type MessagesListDataProps = UseDataUiComponentProps<
  MessageSchema,
  {
    messageData: Partial<MessageProps['messageData']>
    showAvatar?: boolean
  }
>['data']

export default function MessagesListData(props: MessagesListDataProps) {
  const messages = useMemo(() => {
    let ms = props.data || []

    ms = ms?.sort((a, b) => {
      return a.sentDate - b.sentDate
    })

    return ms
  }, [props.data])

  return (
    <>
      <Box
        data-id={MessagesListDataIdName}
        component='ul'
        sx={{
          overflow: 'hidden',
          pt: ['60px', , 0],

          '& *': {
            overflowAnchor: 'none',
          },

          '& li[data-id="MessagesListDataLi"]': {
            mb: 2,
          },

          '& button': {
            transform: 'none !important',
          },
        }}
      >
        <LoadMoreMessagesButton />

        {messages.map((messageData, index) => {
          const prevMessage = messages[index - 1]
          const isPrevMessageNewerTHanCurrentMessage =
            prevMessage?.sentDate > messageData.sentDate

          if (isPrevMessageNewerTHanCurrentMessage) {
            logError({
              error: 'prev message is newer than current',
              fnName: 'MessagesListData',
              metadata: { props },
            })
          }

          return (
            <li
              key={messageData.id || systemMessageId + index}
              data-id='MessagesListDataLi'
            >
              <Message
                showAvatar={props.commonProps?.showAvatar}
                messageData={{
                  ...messageData,
                  ...(props.commonProps?.messageData || {}),
                }}
                allConversationMessages={messages}
                messageIndex={index}
              />
            </li>
          )
        })}

        <Box
          component={'li'}
          id={messagesListBottomIdName}
          sx={{
            overflowAnchor: 'auto',
            height: '1px',
            mb: '0 !important',
          }}
        />
      </Box>
    </>
  )
}

const messagesListBottomIdName = 'messagesListBottom'
const MessagesListDataIdName = 'MessagesListData'

type scrollToBottomOfMessagesListProps = {
  scrollBehavior?: 'auto' | 'smooth'
}
export const scrollToBottomOfMessagesList = (
  props: scrollToBottomOfMessagesListProps = {},
) => {
  const messagesListBottom = document.getElementById(messagesListBottomIdName)

  if (messagesListBottom) {
    messagesListBottom.scrollIntoView({
      behavior: props.scrollBehavior || 'auto',
      block: 'start',
    })
  }
}

export const scrollToTopOfMessagesList = () => {
  const MessagesListDataEl = document.querySelector(
    `[data-id="${MessagesListDataIdName}"]`,
  )

  if (MessagesListDataEl) {
    MessagesListDataEl.scrollTop = 0
  }
}
