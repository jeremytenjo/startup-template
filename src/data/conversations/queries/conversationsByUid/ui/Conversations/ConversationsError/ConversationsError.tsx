import React from 'react'
import Box from '@useweb/ui/Box'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import { type UseDataUiComponentProps } from '@useweb/use-data-ui'

import type ConversationSchema from '../../../../../conversation.schema.js'

export type ConversationsErrorProps = UseDataUiComponentProps<ConversationSchema>['error']

export default function ConversationsError(props: ConversationsErrorProps) {
  console.log(props.error)
  return (
    <Wrapper>
      <ErrorMessage error={props.error} message={'Error loading conversations'} />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='ConversationsError' sx={{}}>
      {children}
    </Box>
  )
}
