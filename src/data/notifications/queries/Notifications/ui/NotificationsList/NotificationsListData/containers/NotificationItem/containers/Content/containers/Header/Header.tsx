import React from 'react'
import Box from '@useweb/ui/Box'
import { dayjs } from '@useweb/date'
import relativeTime from 'dayjs/plugin/relativeTime'
import Text from '@useweb/ui/Text'

import useNotificationItemData from '../../../../useNotificationItemData/useNotificationItemData.js'

dayjs.extend(relativeTime)

export type HeaderProps = any

export default function Header() {
  const notificationItemData = useNotificationItemData()
  const sentDateRelativeToToday = notificationItemData?.notificationData?.sentDate
    ? dayjs(notificationItemData?.notificationData?.sentDate).fromNow(true) + ' ago'
    : false

  return (
    <Box
      data-id='Header'
      sx={{
        width: '100%',
        gap: '10px',
        mb: '5px',
      }}
    >
      <Text
        text={notificationItemData.notificationData?.title}
        sx={{
          color: 'neutral.100',
          fontWeight: 600,
          fontSize: ['12px', '13px'],
        }}
      />

      <Text
        text={sentDateRelativeToToday}
        sx={{
          color: 'neutral.200',
          fontWeight: 500,
          fontSize: [10, 11],
          textAlign: 'left',
          whiteSpace: 'nowrap',
        }}
      />
    </Box>
  )
}
