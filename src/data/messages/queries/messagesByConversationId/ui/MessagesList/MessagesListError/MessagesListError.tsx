import React from 'react'
import Box from '@useweb/ui/Box'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import { type UseDataUiComponentProps } from '@useweb/use-data-ui'

import type MessageSchema from '../../../../../message.schema.js'

export type MessagesListErrorProps = UseDataUiComponentProps<MessageSchema>['error']

export default function MessagesListError(props: MessagesListErrorProps) {
  return (
    <Box data-id='MessagesListError' sx={{}}>
      <ErrorMessage error={props.error} message={'Error loading messages'} />
    </Box>
  )
}
