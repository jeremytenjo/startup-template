import { type UseDataProps, type UpdaterProps } from '@useweb/use-data'
import { doc, updateDoc } from 'firebase/firestore'

import { db } from '../../../../../../lib/integrations/Google/Firebase/firebase.js'
import logError from '../../../../../../lib/utils/loggers/logError/logError.js'
import type NotificationSchema from '../../../../notification.schema.js'

export type UpdateNotificationsProps = UpdaterProps<NotificationSchema>

// updater
export const updateNotifications = async (props: UpdateNotificationsProps) => {
  const notificationRef = doc(db, 'notifications', props.value.id)
  await updateDoc(notificationRef, props.value)

  return {
    updatedItem: props.value,
  }
}

// hook
type useUpdateNotificationsProps = UseDataProps<NotificationSchema>['update']
type useUpdateNotificationsReturn = UseDataProps<NotificationSchema>['update']

export default function useUpdateNotifications(
  props: useUpdateNotificationsProps,
): useUpdateNotificationsReturn {
  const update: useUpdateNotificationsReturn = {
    updater: updateNotifications,

    onUpdate: (result) => {
      props?.onUpdate && props.onUpdate(result)
    },

    onUpdateError: (error) => {
      logError({
        error: error.error,
        fnName: 'useUpdateNotifications',
        metadata: { props },
      })
      props?.onUpdateError && props.onUpdateError(error)
    },
  }

  return update
}
