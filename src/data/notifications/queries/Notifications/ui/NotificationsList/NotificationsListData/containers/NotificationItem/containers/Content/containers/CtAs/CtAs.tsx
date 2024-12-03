import React from 'react'
import Box from '@useweb/ui/Box'
import Button from '@useweb/ui/Button'
import Link from '@useweb/ui/Link'

import useNotificationItemData from '../../../../useNotificationItemData/useNotificationItemData.js'
import { useNotificationPopoverStore } from '../../../../../../../../NotificationsPopover/NotificationsPopover.js'

export default function CtAs() {
  const notificationItemData = useNotificationItemData()

  return !!notificationItemData.notificationData?.ctas?.length ? (
    <Box
      component='ul'
      sx={{
        mt: 1,
        display: 'flex',
        gap: 2,
      }}
    >
      {notificationItemData.notificationData?.ctas?.map((cta) => {
        return (
          <Link key={cta.label} href={cta.href}>
            <Button
              name='Button'
              sx={{
                width: 'fit-content',
              }}
              onClick={() => {
                useNotificationPopoverStore.setState({
                  show: null,
                })
                if (
                  notificationItemData.onClick &&
                  notificationItemData.notificationData?.id
                ) {
                  notificationItemData.onClick({
                    notificationId: notificationItemData.notificationData?.id,
                  })
                }
              }}
            >
              {cta.label}
            </Button>
          </Link>
        )
      })}
    </Box>
  ) : null
}
