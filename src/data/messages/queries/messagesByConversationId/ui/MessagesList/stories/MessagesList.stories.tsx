//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import MessagesListStubs from '../../../../../messages.stubs.js'
import MessagesList from '../MessagesList.js'
import MessagesListData_ from '../MessagesListData/MessagesListData.js'
import MessagesListEmptyData_ from '../MessagesListEmptyData/MessagesListEmptyData.js'
import MessagesListLoading_ from '../MessagesListLoading/MessagesListLoading.js'
import MessagesListError_ from '../MessagesListError/MessagesListError.js'
import { ConversationDataProvider } from '../../../../../../conversations/queries/conversationsByUid/ui/Conversation/useConversationData/useConversationData.js'

const defaultArgs: any = {
  config: {
    conversationId: 'aa',
    uid: 'aa',
    getOptions: {
      onGet: ({ result }) => console.log({ result }),
    },
  },
}

export default {
  title: 'data/Messages/ui/MessagesList',
  args: defaultArgs,
  parameters: {
    signInAs: false,
  },
}

const Wrapper = ({ children }) => {
  return (
    <ConversationDataProvider
      props={{
        conversationId: 'direct-conversation-1',
        uid: 'user1',
      }}
    >
      {children}
    </ConversationDataProvider>
  )
}

// full example
export const MessagesListExample = {
  render: (args) => {
    return (
      <Wrapper>
        <MessagesList {...args} />
      </Wrapper>
    )
  },
}

// data
export const MessagesListWithData = {
  render: () => {
    return (
      <Wrapper>
        <MessagesListData_ {...commonProps} data={MessagesListStubs} />
      </Wrapper>
    )
  },
}

// empty data
export const MessagesListEmptyData = {
  render: () => {
    return (
      <Wrapper>
        <MessagesListEmptyData_ {...commonProps} />
      </Wrapper>
    )
  },
}

// loading
export const MessagesListLoading = {
  render: () => {
    return (
      <Wrapper>
        <MessagesListLoading_ {...commonProps} />
      </Wrapper>
    )
  },
}

// error
export const MessagesListError = {
  render: () => {
    return (
      <Wrapper>
        <MessagesListError_ {...commonProps} error={new Error('MessagesList failed')} />
      </Wrapper>
    )
  },
}

const commonProps = {
  exec: () => null,
}
