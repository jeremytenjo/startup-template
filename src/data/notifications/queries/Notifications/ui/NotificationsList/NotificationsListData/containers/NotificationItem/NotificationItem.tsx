import React from 'react'
import Box from '@useweb/ui/Box'
import Avatar from '@useweb/ui/Avatar'
import Skeleton from '@useweb/ui/Skeleton'

import Content from './containers/Content/Content.js'
import useNotificationItemData, {
  type NotificationItemDataProps,
  NotificationItemDataProvider,
} from './useNotificationItemData/useNotificationItemData.js'

export type NotificationItemProps = NotificationItemDataProps

export default function NotificationItem(props: NotificationItemProps) {
  return (
    <NotificationItemDataProvider props={props}>
      <NotificationItemUi />
    </NotificationItemDataProvider>
  )
}

const NotificationItemUi = () => {
  const notificationItemData = useNotificationItemData()

  return (
    <Box
      data-id='NotificationItem'
      sx={{
        display: 'grid',
        width: '100%',
        justifyContent: 'start',
        height: 'fit-content',
        borderWidth: '1px',
        borderBottom: '1px solid transparent',
        borderBottomColor: 'neutral.300',
        borderBottomStyle: 'solid',
        gridAutoFlow: 'column',
        userSelect: 'none',
        gridGap: '10px',
        p: '10px',
        gridTemplateColumns: 'auto 1fr',
        transition: '0.3s',
        py: '20px',
      }}
    >
      <Skeleton
        loading={notificationItemData.loading}
        circle
        sx={{
          width: '30px',
          height: '30px',
        }}
      >
        <Avatar
          src={
            notificationItemData?.senderUser?.photoURL ||
            notificationItemData?.notificationData?.imageUrl
          }
          alt={notificationItemData?.senderUser?.displayName}
          sx={{ width: '30px', height: '30px' }}
        />
      </Skeleton>
      <Content
        loading={notificationItemData.loading}
        onArchive={notificationItemData.onArchive}
      />
    </Box>
  )
}
