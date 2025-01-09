import assert from '@useweb/assert'
import nodeFetch from 'cross-fetch'
import { getToday } from '@useweb/date'

import { requiredProps } from '../SendSystemMessageSchema.js'
import type SendSystemMessageSchema from '../SendSystemMessageSchema.js'
import getFirebaseAdminServer from '../../../../../lib/integrations/Google/Firebase/admin/utils/getFirebaseAdminServer/getFirebaseAdmin.server.js'
import { messagesCollectionName } from '../../../messages.config.js'
import type MessageSchema from '../../../message.schema.js'
import serverSendNotification from '../../../../notifications/queries/sendNotification/serverSendNotification/serverSendNotification.js'
import sendEmailClient from '../../../../../apiFunctions/sendEmail/sendEmail.client.js'

export type ServerSendSystemMessageProps = SendSystemMessageSchema

export default async function serverSendSystemMessage(
  props: ServerSendSystemMessageProps,
) {
  assert<ServerSendSystemMessageProps>({
    props,
    requiredProps,
  })

  const { firebaseAdmin } = getFirebaseAdminServer()
  const firestore = firebaseAdmin.firestore()

  // save message to firestore
  const newMessageDoc = firestore.collection(messagesCollectionName).doc()

  const messageDocData: MessageSchema = {
    ...props.message,
    id: newMessageDoc.id,
    isSystemMessage: true,
  }

  if (!props.dontAddToConversation) {
    await newMessageDoc.set(messageDocData)
  }

  // send notification
  if (!props.disableNotification) {
    try {
      await serverSendNotification({
        notification: {
          title: props.notificationTitle,
          seen: false,
          senderUid: props.sender.id,
          receiverUid: props.receiver.id,
          sentDate: getToday(),
          imageUrl: props.sender.photoURL,
          message: props.message.body,
          ctas: [...(props.message.ctas || [])],
          ...props.notificationProps,
        },
      })
    } catch (error: any) {
      throw new Error(
        `serverSendSystemMessage serverSendNotification - ${String(error)}`,
        { cause: error?.cause },
      )
    }
  }

  // send email
  if (!props.disableEmail) {
    try {
      await sendEmailClient({
        to: [props.receiver.email],
        from: 'notifications',
        subject: props.notificationTitle,
        template: {
          props: {
            receiverName: props.receiver.name,
            senderImageUrl: props.sender.photoURL,
            title: props.notificationTitle,
            body: props.message?.body,
            ctas: [...(props.message.ctas || [])],
          },
        },
        ...(props.emailProps || {}),
        nextApiProps: {
          fetchFn: nodeFetch,
          isExternalCall: true,
        },
      })
    } catch (error: any) {
      throw new Error(
        `serverSendSystemMessage - sendEmailClient - ${JSON.stringify(error)}`,
        {
          cause: error?.cause,
        },
      )
    }
  }
}

export type ServerSendSystemMessageReturn = ReturnType<typeof serverSendSystemMessage>
