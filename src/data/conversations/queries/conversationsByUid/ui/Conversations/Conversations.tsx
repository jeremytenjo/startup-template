import React from 'react'
import Box from '@useweb/ui/Box'
import UseDataUi from '@useweb/use-data-ui'

import useConversations, {
  type UseConversationsProps,
} from '../../useConversations/useConversations.js'
import { type ConversationPreviewProps } from '../../useConversations/useGetConversations/useGetConversations.js'
import useAuth from '../../../../../users/utils/useAuth/useAuth.js'

import ConversationsData from './ConversationsData/ConversationsData.js'
import ConversationsEmptyData from './ConversationsEmptyData/ConversationsEmptyData.js'
import ConversationsLoading from './ConversationsLoading/ConversationsLoading.js'
import ConversationsError from './ConversationsError/ConversationsError.js'
import ConversationsHeader from './_common/ConversationsHeader/ConversationsHeader.js'
import { ConversationsDataProvider } from './useConversationsData/useConversationsData.js'
import ConversationsListSkeletons from './ConversationsLoading/ConversationsListSkeletons/ConversationsListSkeletons.js'

export type ConversationsProps = {
  dataConfig?: UseConversationsProps
}

export default function ConversationsList(props: ConversationsProps) {
  const auth = useAuth()
  const conversations = useConversations(props.dataConfig)

  return (
    <ConversationsDataProvider props={props}>
      <Wrapper>
        <ConversationsHeader />

        {!auth.user?.id ? (
          <ConversationsListSkeletons />
        ) : (
          <UseDataUi<ConversationPreviewProps>
            asyncFunctionVariable={conversations}
            data={ConversationsData}
            emptyData={ConversationsEmptyData}
            loading={ConversationsLoading}
            error={ConversationsError}
          />
        )}
      </Wrapper>
    </ConversationsDataProvider>
  )
}

const Wrapper = ({ children }) => {
  return (
    <Box
      data-id='ConversationsList'
      sx={{
        borderRight: [, , '1px solid'],
        borderRightColor: [, , 'neutral.300'],
        overflow: [, , 'hidden'],
      }}
    >
      {children}
    </Box>
  )
}
