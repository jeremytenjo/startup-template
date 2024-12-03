import React from 'react'
import Box from '@useweb/ui/Box'
import UseDataUi from '@useweb/use-data-ui'

import useNotifications, {
  type UseNotificationsProps,
} from '../../useNotifications/useNotifications.js'
import type NotificationSchema from '../../../../notification.schema.js'

import NotificationsListData from './NotificationsListData/NotificationsListData.js'
import NotificationsListEmptyData from './NotificationsListEmptyData/NotificationsListEmptyData.js'
import NotificationsListLoading from './NotificationsListLoading/NotificationsListLoading.js'
import NotificationsListError from './NotificationsListError/NotificationsListError.js'
import NotificationsHeader from './containers/NotificationsHeader/NotificationsHeader.js'

export type NotificationsListProps = {
  dataConfig?: UseNotificationsProps
}

export default function NotificationsList(props: NotificationsListProps) {
  const notifications = useNotifications(props.dataConfig)

  return (
    <Box
      data-id='Notifications'
      sx={{
        height: '100%',
        gridTemplateRows: 'auto 1fr',
        display: 'grid',
        backgroundColor: 'neutral.450',
        borderRadius: '32px',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'neutral.300',
      }}
    >
      <NotificationsHeader />

      <Content>
        <UseDataUi<NotificationSchema>
          asyncFunctionVariable={notifications}
          data={NotificationsListData}
          emptyData={NotificationsListEmptyData}
          loading={NotificationsListLoading}
          error={NotificationsListError}
        />
      </Content>
    </Box>
  )
}

const Content = ({ children }) => {
  return (
    <Box
      data-id='NotificationsList'
      sx={{
        overflow: 'auto',
        borderRadius: '32px',
      }}
    >
      {children}
    </Box>
  )
}
