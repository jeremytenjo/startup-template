import React from 'react'
import Box from '@useweb/ui/Box'
import { type UseDataUiComponentProps } from '@useweb/use-data-ui'
import EmptyMessage from '@useweb/ui/EmptyMessage'
import Image from '@useweb/ui/Image'

import type NotificationSchema from '../../../../../notification.schema.js'

export type NotificationsListEmptyDataProps =
  UseDataUiComponentProps<NotificationSchema>['emptyData']

export default function NotificationsListEmptyData(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  props: NotificationsListEmptyDataProps,
) {
  return (
    <Box
      data-id='NotificationsListEmptyData'
      sx={{
        height: '100%',
        display: 'grid',
        placeContent: 'center',
        backgroundColor: 'transparent',
        py: '40px',
      }}
    >
      <EmptyMessage
        subTitle='No new notifications'
        sx={{
          '& p[data-id="EmptyMessageSubTitle"]': {
            fontWeight: 'bold',
            color: 'neutral.200',
          },
        }}
        icon={
          <Image
            src={`/images/misc/notifications.png`}
            alt={`alt`}
            width={150}
            height={150}
          />
        }
      />
    </Box>
  )
}
