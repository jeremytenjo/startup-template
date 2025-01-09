import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import IconButton from '@useweb/ui/IconButton'
import date, { getToday } from '@useweb/date'
import useEventListener from '@useweb/use-event-listener'

import colors from '../../../../theme/tokens/colors.js'
import type DateSchema from '../../../../data/_commonSchemas/DateSchema/date.schema.js'
import SendMessageIcon from '../../../../lib/components/icons/SendMessageIcon.js'

import type { RawAttachmentProps } from './handlers/MessageInputAttachments/useMessageInputAttachments/useMessageInputAttachments.js'
import MessageAttachmentInput from './handlers/MessageInputAttachments/MessageAttachmentInput/MessageAttachmentInput.js'
import MessageInputAttachments from './handlers/MessageInputAttachments/MessageInputAttachments/MessageInputAttachments.js'

export type OnSendMessageProps = {
  message: string
  rawAttachments: RawAttachmentProps
  sentDate: DateSchema
}

export type MessageInputFieldProps = {
  onSendMessage: (props: OnSendMessageProps) => any
  lastMessageSentDate: DateSchema | undefined
  disableInput?: boolean
  recipientName?: string
  sx?: BoxProps['sx']
}

export default function MessageInputField(props: MessageInputFieldProps) {
  const [rawAttachments, setRawAttachments] = React.useState<RawAttachmentProps>([])
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null)
  const valueRef = React.useRef('')

  useEventListener('paste', (e: ClipboardEvent) => {
    const files = e.clipboardData?.files

    if (files) {
      Array.from(files).map((file) => {
        setRawAttachments((prev) => {
          const latestFilesRaw = [...prev, { file, id: file ? file.name : '' }]
          const uniqueFilesRaw = latestFilesRaw.filter(
            (file, index, self) => self.findIndex((t) => t.id === file.id) === index,
          )

          return uniqueFilesRaw
        })
      })
    }
  })

  const valueRefData = {
    get() {
      if (textAreaRef.current) {
        return textAreaRef.current.value
      }
    },
    update({ value }) {
      if (textAreaRef.current) {
        valueRef.current = value
      }
    },
    reset() {
      if (textAreaRef.current) {
        valueRef.current = ''
        textAreaRef.current.value = ''
      }
    },
  }

  const updateTextareaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0px'
      const scrollHeight = textAreaRef.current.scrollHeight
      textAreaRef.current.style.height = scrollHeight + 'px'
    }
  }

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textAreaRef.current) {
      valueRefData.update({ value: evt.target.value })
      updateTextareaHeight()
    }
  }

  const sendMessage = () => {
    if (props.disableInput) return

    textAreaRef.current?.focus()

    const messageValue = valueRefData.get()?.trim() || ''

    // don't send message if message is empty and there are no attachments
    if (messageValue === '' && !rawAttachments.length) {
      return
    }

    const currentDateTimestamp = getToday()

    // last message plus current date
    let sentDate = currentDateTimestamp

    if (props.lastMessageSentDate) {
      if (currentDateTimestamp < props.lastMessageSentDate) {
        // set sent date to last message date plus 1 millisecond if current date is less than last message date
        sentDate = date(props.lastMessageSentDate).add(1, 'milliseconds').valueOf()
      }
    }

    props.onSendMessage({
      message: messageValue,
      rawAttachments,
      sentDate,
    })

    valueRefData.reset()
    setRawAttachments([])
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // const handlePaste = (event) => {
  //   if (event.clipboardData.files.length) {
  //     const file = event.clipboardData.files[0]
  //     console.log(file)
  //   }
  // }

  return (
    <Box
      data-id='MessageInputField'
      sx={{
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateColumns: '1fr 49px',
        borderRadius: [, , '0 0 6px 0'],
        ...(props.sx || {}),
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gap: 1,
          alignItems: 'end',
          alignContent: 'center',
          borderRadius: '20px',
          bgcolor: 'neutral.300',
          px: 1,
          pr: 0,
          border: '1px solid transparent',
          borderColor: 'neutral.400',
        }}
      >
        <MessageInputAttachments
          attachmentsProps={{
            rawAttachments,
            setRawAttachments,
          }}
        />

        <Box
          sx={{
            display: 'grid',
            gap: 1,
            gridAutoFlow: 'column',
            alignItems: 'center',
            alignContent: 'center',
            gridTemplateColumns: '1fr fit-content(100%)',
          }}
        >
          {/* Message Input */}
          <Box
            component={'form'}
            sx={{
              display: 'contents',

              '& textarea': {
                width: '100%',
                lineHeight: '20px',
                p: 0,
                resize: 'none',
                wordBreak: 'break-word',
                wordWrap: 'break-word',
                overflowY: 'auto',
                overflowX: 'hidden',
                fontSize: '16px',
                outline: 'none',
                border: 'none',
                maxHeight: ['100px', , '200px'],
                background: 'transparent',
                color: 'neutral.100',
                '&::placeholder': {
                  color: 'neutral.200',
                },
                ...scrollbarStyles,
              },
            }}
          >
            <textarea
              id='message-input'
              onChange={handleChange}
              name='messageInput'
              placeholder={`Message ${props.recipientName || ''}`}
              ref={textAreaRef}
              rows={1}
              onKeyDown={onKeyDown}
              disabled={props.disableInput}
              // onPaste={handlePaste}
            />
          </Box>

          {/* Attachment Input */}
          <MessageAttachmentInput
            attachmentsProps={{
              rawAttachments,
              setRawAttachments,
            }}
          />
        </Box>
      </Box>

      {/* Send Message Button */}
      <IconButton
        name='send message'
        onClick={sendMessage}
        sx={{
          borderRadius: '16px',
          border: '1px solid transparent',
          borderColor: 'primary.light',
          transform: 'translateX(8px)',
          backgroundColor: 'primary.main',
          '&:active, &:focus, &:hover': {
            backgroundColor: 'primary.main',
          },
        }}
      >
        <SendMessageIcon />
      </IconButton>
    </Box>
  )
}

export const scrollbarStyles = {
  '&::-webkit-scrollbar': {
    background: 'transparent',
    width: '5px',
    height: '5px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: colors.neutral[300],
    borderRadius: '32px',
  },
}
