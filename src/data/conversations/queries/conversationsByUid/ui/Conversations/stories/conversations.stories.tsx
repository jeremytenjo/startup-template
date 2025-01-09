//https://storybook.js.org/docs/react/writing-docs/docs-page
import React from 'react'

import Conversations, { type ConversationsProps } from '../Conversations.js'
import ConversationsData_ from '../ConversationsData/ConversationsData.js'
import ConversationsEmptyData_ from '../ConversationsEmptyData/ConversationsEmptyData.js'
import ConversationsLoading_ from '../ConversationsLoading/ConversationsLoading.js'
import ConversationsError_ from '../ConversationsError/ConversationsError.js'

const defaultArgs: ConversationsProps = {
  dataConfig: {
    getOptions: {
      fetcherPayload: {
        uid: 'user1',
      },
    },
  },
}

export default {
  title: 'data/Conversations/ui/Conversations',
  args: defaultArgs,
  parameters: {
    signInAs: 'user1',
  },
}

// full example
export const ConversationsExample = {
  render: (args) => {
    return (
      <>
        {/* pass fetcher payload via dataConfig.getOptions.fetcherPayload */}
        <Conversations {...args} />
      </>
    )
  },
}

// data
export const ConversationsWithData = {
  render: () => {
    return (
      <>
        <ConversationsData_ {...commonProps} data={[]} />
      </>
    )
  },
}

// empty data
export const ConversationsEmptyData = {
  render: () => {
    return (
      <>
        <ConversationsEmptyData_ {...commonProps} />
      </>
    )
  },
}

// loading
export const ConversationsLoading = {
  render: () => {
    return (
      <>
        <ConversationsLoading_ />
      </>
    )
  },
}

// error
export const ConversationsError = {
  render: () => {
    return (
      <>
        <ConversationsError_ {...commonProps} error={new Error('Conversations failed')} />
      </>
    )
  },
}

const commonProps = {
  exec: () => null,
}
