import assert from '@useweb/assert'
import { collection, doc, setDoc } from 'firebase/firestore'

import { db } from '../../../../lib/integrations/Google/Firebase/firebase.js'
import logError from '../../../../lib/utils/loggers/logError/logError.js'
import type NotificationSchema from '../../notification.schema.js'
import { notificationsCollectionName } from '../../notifications.config.js'

import type SendNotificationSchemaSchema from './SendNotificationSchemaSchema/SendNotificationSchema.schema.js'

export type SendNotificationProps = SendNotificationSchemaSchema

export default async function sendNotification(props: SendNotificationProps) {
  assert({ props, requiredProps: ['notification'] })

  if (!props.notification.receiverUid) {
    logError({
      error: 'Missing receiverUid prop',
      fnName: 'sendNotification',
      metadata: { props },
    })
    throw new Error('Missing receiverUid prop')
  }

  const newDocRef = doc(collection(db, notificationsCollectionName))
  const newItem: NotificationSchema = {
    ...props.notification,
    id: newDocRef.id,
    jobId: props.notification.jobId || false,
  }

  await setDoc(newDocRef, newItem)
}

export type SendNotificationReturn = ReturnType<typeof sendNotification>
