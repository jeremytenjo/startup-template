import { type UseDataProps, type CreatorProps } from '@useweb/use-data'

import logError from '../../../../../../lib/utils/loggers/logError/logError.js'
import type NotificationSchema from '../../../../notification.schema.js'

export type CreateNotificationsProps = CreatorProps<NotificationSchema>

// creator
export const createNotifications = async (props: CreateNotificationsProps) => {
  if (!props.newItem) {
    throw new Error('Missing newItem prop')
  }
  const newItem: NotificationSchema = props.newItem

  return { newItem }
}

// hook
type useCreateNotificationsProps = UseDataProps<NotificationSchema>['create']
type useCreateNotificationsReturn = UseDataProps<NotificationSchema>['create']

export default function useCreateNotifications(
  props: useCreateNotificationsProps,
): useCreateNotificationsReturn {
  const create: useCreateNotificationsReturn = {
    creator: createNotifications,

    onCreate: (result) => {
      props?.onCreate && props?.onCreate(result)
    },

    onCreateError: (error) => {
      logError({
        error: error.error,
        fnName: 'useCreateNotifications',
        metadata: { props },
      })
      props?.onCreateError && props?.onCreateError(error)
    },
  }

  return create
}
