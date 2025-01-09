import assert from '@useweb/assert'
import { doc, collection, setDoc } from 'firebase/firestore'
import { getToday } from '@useweb/date'

import { db } from '../../../../lib/integrations/Google/Firebase/firebase.js'
import type MessageSchema from '../../message.schema.js'
import { messagesCollectionName } from '../../messages.config.js'
import sendNotification from '../../../notifications/queries/sendNotification/sendNotification.js'
import logError from '../../../../lib/utils/loggers/logError/logError.js'
import sendEmailClient from '../../../../apiFunctions/sendEmail/sendEmail.client.js'
import appConfig from '../../../../../app.config.js'

import { requiredProps } from './SendSystemMessageSchema.js'
import type SendSystemMessageSchema from './SendSystemMessageSchema.js'

export type SendSystemMessageProps = SendSystemMessageSchema

// add message to job conversation, sends notification, sends email
export default async function sendSystemMessage(props: SendSystemMessageProps) {
  assert<SendSystemMessageProps>({
    props,
    requiredProps,
  })

  // save message to firestore
  const newMessageDoc = doc(collection(db, messagesCollectionName))

  const messageDocData: MessageSchema = {
    ...props.message,
    id: newMessageDoc.id,
    isSystemMessage: true,
  }

  if (!props.dontAddToConversation) {
    await setDoc(newMessageDoc, messageDocData)
  }

  // send notification
  if (!props.disableNotification) {
    try {
      await sendNotification({
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
      logError({
        error,
        fnName: 'sendSystemMessage sendNotification',
        metadata: { props },
      })
    }
  }

  // send email
  if (!props.disableEmail) {
    try {
      await sendEmailClient({
        to: [props.receiver.email],
        from: 'notifications',
        subject:
          props.notificationTitle?.replaceAll('\\n', '') ||
          `${appConfig.siteInfo.name} Notification`,
        template: {
          props: {
            receiverName: props.receiver.name,
            senderImageUrl: props.sender.photoURL,
            title: props?.notificationTitle,
            body: props.message?.body,
            ctas: [...(props.message.ctas || [])],
          },
        },
        ...(props.emailProps || {}),
      })
    } catch (error: any) {
      logError({
        error,
        fnName: 'sendSystemMessage - sendEmailClient',
        metadata: { props },
      })
    }
  }

  return { sentMessage: messageDocData }
}

export type SendSystemMessageReturn = ReturnType<typeof sendSystemMessage>
