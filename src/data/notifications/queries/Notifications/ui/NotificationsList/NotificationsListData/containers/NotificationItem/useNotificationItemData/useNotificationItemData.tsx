import React, { createContext, useContext } from 'react'
import { useUsers } from '@useweb/firebase/useFirebaseAuth'

import type NotificationSchema from '../../../../../../../../notification.schema.js'
import type UserSchema from '../../../../../../../../../users/user.schema.js'

export type NotificationItemDataProps = {
  notificationData?: NotificationSchema
  loading?: boolean
  onClick?: (props: { notificationId: string }) => void
  onArchive?: () => any
}

export type NotificationItemDataReturn = NotificationItemDataProps & {
  senderUser: UserSchema
}

export const NotificationItemDataContext = createContext<NotificationItemDataReturn>(
  undefined as any,
)

type NotificationItemDataProviderProps = {
  children: any
  props: NotificationItemDataProps
}

export const NotificationItemDataProvider = (
  props: NotificationItemDataProviderProps,
) => {
  const senderUser = useUsers<UserSchema>({
    id: props?.props?.notificationData?.senderUid,
  })
  const data: NotificationItemDataReturn = {
    ...props.props,
    senderUser: senderUser.user,
    onArchive: props.props.onArchive,
  }

  return (
    <NotificationItemDataContext.Provider value={data}>
      {props.children}
    </NotificationItemDataContext.Provider>
  )
}

const useNotificationItemData = () => useContext(NotificationItemDataContext)

export default useNotificationItemData
