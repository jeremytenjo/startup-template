import React, { createContext, useContext, useEffect } from 'react'
import useData, { type UseDataReturn } from '@useweb/use-data'
import { useUsers } from '@useweb/firebase/useFirebaseAuth'
import assert from '@useweb/assert'

import { type ConversationProps } from '../Conversation.js'
import type UserSchema from '../../../../../../users/user.schema.js'
import getConversationById from '../../../getConversationById/getConversationById.js'
import type ConversationSchema from '../../../../../conversation.schema.js'
import useAuth from '../../../../../../users/utils/useAuth/useAuth.js'
import logError from '../../../../../../../lib/utils/loggers/logError/logError.js'

export type ConversationDataProps = ConversationProps

export type ConversationDataReturn = ConversationDataProps & {
  otherUsers: UseDataReturn<UserSchema, any>
  data: UseDataReturn<ConversationSchema, any>
}

export const ConversationDataContext = createContext<ConversationDataReturn>(
  undefined as any,
)

type ConversationDataProviderProps = {
  children: any
  props: ConversationDataProps
}

export const ConversationDataProvider = (props: ConversationDataProviderProps) => {
  const auth = useAuth()
  const users = useUsers<UserSchema>()

  const otherUsers = useData<UserSchema, any>({
    id:
      props.props?.conversationId && props.props.uid
        ? `conversation/${props.props.conversationId}/otherUsers`
        : undefined,
    get: {
      fetcher: async () => {
        assert({
          props: {
            conversationId: props.props.conversationId,
            uid: props.props.uid,
          },
        })

        if (!props.props.conversationId) {
          throw new Error('props.props.conversationId is undefined')
        }
        const convo = await getConversationById({
          conversationId: props.props.conversationId,
        })
        const otherMembersArray = convo?.members || []
        const otherUsersIds = otherMembersArray.filter((u) => u !== props.props.uid)

        if (!otherUsersIds?.length) {
          throw new Error("Couldn't find other user in conversation")
        }

        const otherUsers: UserSchema[] = await Promise.all(
          otherUsersIds.map(async (otherUserId) => {
            const otherUserData = await users.getUser({ id: otherUserId })

            if (!otherUserData) {
              throw new Error(
                `Couldn't find other user in conversation with id ${otherUserId}`,
              )
            }

            return otherUserData
          }),
        )

        return otherUsers || []
      },
      getOnMount: true,
      onGetError(p) {
        logError({
          error: p.error,
          fnName: 'ConversationDataProvider otherUsers.get',
          metadata: { p },
        })
      },
    },
  })

  useEffect(() => {
    if (otherUsers.get.data?.length) {
      props.props.onOtherUserLoaded &&
        props.props.onOtherUserLoaded({
          otherUser: otherUsers.get.data[0],
        })
    }
  }, [otherUsers.get.data])

  const data = useData<ConversationSchema, { conversationId: string }>({
    id:
      auth.user?.id && props.props?.conversationId
        ? `conversation/${props.props.conversationId}`
        : undefined,
    get: {
      fetcher: async () => {
        assert({
          props: {
            conversationId: props.props.conversationId,
          },
        })

        if (!props.props.conversationId) {
          throw new Error('props.props.conversationId is undefined')
        }

        const convo = await getConversationById({
          conversationId: props.props.conversationId,
        })

        return convo ? [convo] : []
      },
      onGetError(props) {
        logError({
          error: props.error,
          fnName: 'ConversationDataProvider data.get',
          metadata: { props },
        })
      },
    },
  })

  const value: ConversationDataReturn = {
    ...props.props,
    otherUsers,
    data,
  }

  return (
    <ConversationDataContext.Provider value={value}>
      {props.children}
    </ConversationDataContext.Provider>
  )
}

const useConversationData = () => useContext(ConversationDataContext)

export default useConversationData
