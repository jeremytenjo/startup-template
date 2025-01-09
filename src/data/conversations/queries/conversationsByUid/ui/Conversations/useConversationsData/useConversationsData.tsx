import React, { createContext, useContext } from 'react'

import { type ConversationsProps } from '../Conversations.js'

export type ConversationsDataProps = ConversationsProps

export type ConversationsDataReturn = ConversationsDataProps

export const ConversationsDataContext = createContext<ConversationsDataReturn>(
  undefined as any,
)

type ConversationsDataProviderProps = {
  children: any
  props: ConversationsDataProps
}

export const ConversationsDataProvider = (props: ConversationsDataProviderProps) => {
  const data: ConversationsDataReturn = {
    ...props.props,
  }

  return (
    <ConversationsDataContext.Provider value={data}>
      {props.children}
    </ConversationsDataContext.Provider>
  )
}

const useConversationsData = () => useContext(ConversationsDataContext)

export default useConversationsData
