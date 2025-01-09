import React from 'react'
import Box from '@useweb/ui/Box'
import { type UseDataUiComponentProps } from '@useweb/use-data-ui'

import type ConversationSchema from '../../../../../conversation.schema.js'

import ConversationsListSkeletons from './ConversationsListSkeletons/ConversationsListSkeletons.js'

export type ConversationsLoadingProps =
  UseDataUiComponentProps<ConversationSchema>['loading']

export default function ConversationsLoading() {
  return (
    <Wrapper>
      <ConversationsListSkeletons />
    </Wrapper>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box data-id='ConversationsLoading' sx={{}}>
      {children}
    </Box>
  )
}
