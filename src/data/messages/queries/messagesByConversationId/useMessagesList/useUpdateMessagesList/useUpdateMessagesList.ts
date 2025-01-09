import { uploadFile } from '@useweb/firebase/useFirebaseStorage'
import { type UseDataProps, type UpdaterProps } from '@useweb/use-data'
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore'

import useAuth from '../../../../../users/utils/useAuth/useAuth.js'
import { db } from '../../../../../../lib/integrations/Google/Firebase/firebase.js'
import logError from '../../../../../../lib/utils/loggers/logError/logError.js'
import type MessageSchema from '../../../../message.schema.js'
import { messagesCollectionName } from '../../../../messages.config.js'

export type UpdaterPayloadProps = {
  currentUserUid: string
}

type UpdateMessagesListProps = UpdaterProps<MessageSchema, UpdaterPayloadProps>

// updater
export const updateMessagesList = async (props: UpdateMessagesListProps) => {
  if (props.value.saveToFirestore) {
    try {
      // upload attachments
      const attachments: MessageSchema['attachments'] = []
      if (props.value.rawAttachments?.length) {
        await Promise.all(
          props.value.rawAttachments.map(async (rawAttachment) => {
            const uploadedFile = await uploadFile({
              file: rawAttachment.file,
              storageFolder: 'conversation_attachments',
            })

            if (!uploadedFile.downloadUrl) {
              throw new Error(`Could not upload file ${rawAttachment.file.name}`)
            }

            attachments.push({
              downloadUrl: uploadedFile.downloadUrl,
              name: rawAttachment.file.name,
              type: rawAttachment.file.type,
            })
          }),
        )
      }

      const updatedMessageDocRef = doc(collection(db, messagesCollectionName))

      const updatedMessage: MessageSchema = {
        id: updatedMessageDocRef.id,
        attachments,
        body: props.value.body,
        conversationId: props.value.conversationId,
        sentDate: props.value.sentDate,
        saveToFirestore: false,
        senderUid: props.value.senderUid,
        seenBy: props.value.senderUid,
      }

      // only add if defined because firestore does not accept undefined values
      if (props.value?.ctas) {
        updatedMessage.ctas = props.value.ctas
      }

      // save message to firestore
      await setDoc(updatedMessageDocRef, updatedMessage)

      return {
        // update id after cache is updated
        updatedItem: {
          ...updatedMessage,
          id: props.value.id,
        },
        replaceIdWith: updatedMessageDocRef.id,
      }
    } catch (error: any) {
      logError({
        error,
        fnName: 'updateMessagesList',
        metadata: { props },
      })
      throw new Error(error)
    }
  }

  // use to update new message recieved
  if (props.value.updateSeenByCurrentUser) {
    if (!props.payload?.currentUserUid) {
      throw new Error("Can't update seen by current user, no current user signed in")
    }

    if (!props.value.id) {
      throw new Error(
        `Can't update seen by current user, no message id ${JSON.stringify(props.value)}`,
      )
    }

    // add current user to seen by if not there yet
    if (props.value.seenBy !== props.payload?.currentUserUid) {
      const messageupdateData: Partial<MessageSchema> = {
        seenBy: props.value.seenBy + props.payload?.currentUserUid,
      }
      const uDoc = doc(db, messagesCollectionName, props.value.id)
      await updateDoc(uDoc, messageupdateData)
    }
  }

  return undefined
}

// hook
export type UseUpdateMessagesListProps = UseDataProps<MessageSchema>['update']
type useUpdateMessagesListReturn = UseDataProps<MessageSchema>['update']

export default function useUpdateMessagesList(
  props = {} as UseUpdateMessagesListProps,
): useUpdateMessagesListReturn {
  const auth = useAuth()

  const update: useUpdateMessagesListReturn = {
    updater: updateMessagesList,

    onUpdate: (result) => {
      props?.onUpdate && props.onUpdate(result)
    },
    updaterPayload: {
      currentUserUid: auth.user?.id,
    },

    onUpdateStart: () => {
      // scrollToBottomOfMessagesList()
    },

    onUpdateError: (error) => {
      logError({
        error: error.error,
        fnName: 'useUpdateMessagesList',
        metadata: { props },
      })
      props?.onUpdateError && props.onUpdateError(error)
    },
  }

  return update
}
