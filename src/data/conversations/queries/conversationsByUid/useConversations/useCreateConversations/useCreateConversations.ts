import assert from '@useweb/assert'
import { getUserFromFirestore } from '@useweb/firebase/useFirebaseAuth'
import type { CreatorProps } from '@useweb/use-data'
import { type UseDataProps } from '@useweb/use-data'
import { collection, doc, setDoc } from 'firebase/firestore'

import { db } from '../../../../../../lib/integrations/Google/Firebase/firebase.js'
import logError from '../../../../../../lib/utils/loggers/logError/logError.js'
import type UserSchema from '../../../../../users/user.schema.js'
import type ConversationSchema from '../../../../conversation.schema.js'
import { conversationsCollectionName } from '../../../../conversations.config.js'
import getConversationWithUid from '../../../getConversationWithUid/getConversationWithUid.js'
import { type ConversationPreviewProps } from '../useGetConversations/useGetConversations.js'

export type CreateConversationsPayloadProps = {
  user1: string
  user2: string
  type: ConversationSchema['type']
  ignoreGetConversationWithUid?: boolean
  addAgencyToConversation?: UserSchema | undefined
}

// creator
export const createConversation = async (
  props: CreatorProps<ConversationPreviewProps, CreateConversationsPayloadProps>,
) => {
  assert({ props: props.payload })

  if (!props.payload?.type) {
    throw new Error("Can't create conversation without type")
  }

  if (!props?.payload?.user1 || !props?.payload?.user2) {
    throw new Error(`Missing user1 or user2 in ${JSON.stringify(props.payload)})}`)
  }

  if (props.payload?.user1 === props.payload?.user2) {
    throw new Error("Can't create conversation with same user")
  }

  // prevents from running twice, eg in send new message
  if (!props.payload?.ignoreGetConversationWithUid) {
    const conversationBetweenUsersExists = await getConversationWithUid({
      currentUid: props?.payload?.user1 as string,
      uid: props?.payload?.user2 as string,
    })

    if (conversationBetweenUsersExists) {
      throw new Error('Conversation already exists')
    }
  }

  const otherMember = await getUserFromFirestore<UserSchema>({
    id: props.payload?.user2,
  })

  if (!otherMember) {
    throw new Error(`Can't find other member ${props.payload?.user2}`)
  }

  const collectionRef = collection(db, conversationsCollectionName)
  const docRef = doc(collectionRef)

  const newConversation: ConversationSchema = {
    id: docRef.id,
    members: [props.payload?.user1, otherMember.id],
    type: props.payload?.type,
    reported: false,
  }

  if (props.payload?.addAgencyToConversation?.id) {
    newConversation.members.push(props?.payload?.addAgencyToConversation?.id)
  }

  await setDoc(docRef, newConversation)

  const createdItem: ConversationPreviewProps = {
    id: docRef.id,
    latestMessage: {
      isSentByCurrentUser: true,
      message: undefined,
      otherMember,
    },
    rawConversation: newConversation,
  }

  return { newItem: createdItem }
}

export type CreateConversationsReturn = ReturnType<typeof createConversation>

// hook
type useCreateConversationsProps = UseDataProps<ConversationPreviewProps>['create']
type useCreateConversationsReturn = UseDataProps<ConversationPreviewProps>['create']

export default function useCreateConversations(
  props: useCreateConversationsProps,
): useCreateConversationsReturn {
  const create: useCreateConversationsReturn = {
    creator: createConversation,

    onCreate: (result) => {
      props?.onCreate && props?.onCreate(result)
    },

    onCreateError: (error) => {
      logError({
        error: error.error,
        fnName: 'useCreateConversations',
        metadata: { props },
      })
      props?.onCreateError && props?.onCreateError(error)
    },
  }

  return create
}
