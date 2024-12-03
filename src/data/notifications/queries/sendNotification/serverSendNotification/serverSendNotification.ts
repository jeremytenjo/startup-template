import assert from '@useweb/assert'

import type SendNotificationSchemaSchema from '../SendNotificationSchemaSchema/SendNotificationSchema.schema.js'
import getFirebaseAdminServer from '../../../../../lib/integrations/Google/Firebase/admin/utils/getFirebaseAdminServer/getFirebaseAdmin.server.js'
import type NotificationSchema from '../../../notification.schema.js'
import { notificationsCollectionName } from '../../../notifications.config.js'
import logFirebaseCloudFunctionError from '../../../../../../firebaseFunctions/src/utils/logFirebaseCloudFunctionError/logFirebaseCloudFunctionError.js'

export type ServerSendNotificationProps = SendNotificationSchemaSchema

export default async function serverSendNotification(props: ServerSendNotificationProps) {
  assert<ServerSendNotificationProps>({ props, requiredProps: ['notification'] })

  if (!props.notification.receiverUid) {
    logFirebaseCloudFunctionError({
      fnName: 'serverSendNotification',
      description: 'Missing receiverUid prop',
      throwError: true,
      metadata: {
        props,
      },
    })
  }

  const { firebaseAdmin } = getFirebaseAdminServer()
  const firestore = firebaseAdmin.firestore()

  const newDocRef = firestore.collection(notificationsCollectionName).doc()

  const newItem: NotificationSchema = {
    ...props.notification,
    id: newDocRef.id,
    jobId: props.notification.jobId || false,
  }

  await newDocRef.set(newItem)
}

export type ServerSendNotificationReturn = ReturnType<typeof serverSendNotification>
