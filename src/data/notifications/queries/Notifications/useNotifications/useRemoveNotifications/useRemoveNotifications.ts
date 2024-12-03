import { type UseDataProps, type RemoverProps } from '@useweb/use-data'

import logError from '../../../../../../lib/utils/loggers/logError/logError.js'
import type NotificationSchema from '../../../../notification.schema.js'

export type RemoveNotificationsProps = RemoverProps<NotificationSchema>

// remover
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const removeNotifications = async (props: RemoveNotificationsProps) => {
  // do not remove from database, keep this to remove from cache
}

// hook
type useRemoveNotificationsProps = UseDataProps<NotificationSchema>['remove']
type useRemoveNotificationsReturn = UseDataProps<NotificationSchema>['remove']

export default function useRemoveNotifications(
  props: useRemoveNotificationsProps,
): useRemoveNotificationsReturn {
  const remove: useRemoveNotificationsReturn = {
    remover: removeNotifications,

    onRemove: (result) => {
      props?.onRemove && props.onRemove(result)
    },

    onRemoveError: (error) => {
      logError({
        error: error.error,
        fnName: 'useRemoveNotifications',
        metadata: { props },
      })
      props?.onRemoveError && props.onRemoveError(error)
    },
  }

  return remove
}
