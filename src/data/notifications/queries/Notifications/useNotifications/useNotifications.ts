import useData, { type UseDataProps } from '@useweb/use-data'

import type NotificationSchema from '../../../notification.schema.js'
import useAuth from '../../../../users/utils/useAuth/useAuth.js'

import useGetNotifications, {
  type GetNotificationsProps,
} from './useGetNotifications/useGetNotifications.js'
import useCreateNotifications from './useCreateNotifications/useCreateNotifications.js'
import useUpdateNotifications from './useUpdateNotifications/useUpdateNotifications.js'
import useRemoveNotifications from './useRemoveNotifications/useRemoveNotifications.js'

export type UseNotificationsProps = {
  getOptions?: UseDataProps<NotificationSchema, GetNotificationsProps>['get']
  createOptions?: UseDataProps<NotificationSchema>['create']
  updateOptions?: UseDataProps<NotificationSchema>['update']
  removeOptions?: UseDataProps<NotificationSchema>['remove']
}

export const getUseNotificationsDataId = ({ currentUid }) => {
  return `notifications/${currentUid}`
}

export default function useNotifications(props: UseNotificationsProps = {}) {
  const auth = useAuth()

  const get = useGetNotifications(props?.getOptions)
  const create = useCreateNotifications(props?.createOptions)
  const update = useUpdateNotifications(props?.updateOptions)
  const remove = useRemoveNotifications(props?.removeOptions)

  const notifications = useData<NotificationSchema, GetNotificationsProps>({
    id: auth.user?.id
      ? getUseNotificationsDataId({
          currentUid: auth.user?.id,
        })
      : undefined,
    get,
    create,
    update,
    remove,
  })

  return notifications
}
