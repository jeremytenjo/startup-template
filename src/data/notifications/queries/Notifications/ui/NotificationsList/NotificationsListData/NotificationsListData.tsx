import React, { useMemo } from 'react'
import Box from '@useweb/ui/Box'
import List from '@useweb/ui/List'
import { type UseDataUiComponentProps } from '@useweb/use-data-ui'

import type NotificationSchema from '../../../../../notification.schema.js'
import useNotifications from '../../../useNotifications/useNotifications.js'
import { useNotificationPopoverStore } from '../../NotificationsPopover/NotificationsPopover.js'
import NotificationsListEmptyData from '../NotificationsListEmptyData/NotificationsListEmptyData.js'

import NotificationItem from './containers/NotificationItem/NotificationItem.js'

export type NotificationsListDataProps =
  UseDataUiComponentProps<NotificationSchema>['data']

export default function NotificationsListData(props: NotificationsListDataProps) {
  const notifications = useNotifications()
  const unseenNotifications = useMemo(() => {
    return props.data
      ?.filter((notification) => !notification.seen)
      ?.sort((a, b) => {
        return b.sentDate - a.sentDate
      })
  }, [props.data])

  return Boolean(unseenNotifications?.length) ? (
    <Box data-id='NotificationsListData' sx={{}}>
      <List<NotificationSchema>
        data={unseenNotifications || []}
        ListItemComponent={({ itemData }) => {
          const setToSeen = () => {
            if (unseenNotifications.length === 1) {
              useNotificationPopoverStore.setState({
                show: null,
              })
            }
            notifications.update.exec({
              value: {
                ...itemData,
                seen: true,
              },
            })
            notifications.remove.exec({
              id: itemData.id,
            })
          }
          return (
            <NotificationItem
              notificationData={itemData}
              onClick={setToSeen}
              onArchive={setToSeen}
            />
          )
        }}
      />
    </Box>
  ) : (
    <NotificationsListEmptyData exec={() => null} />
  )
}
