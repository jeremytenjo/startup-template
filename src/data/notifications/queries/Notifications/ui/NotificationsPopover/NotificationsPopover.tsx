import React, { useMemo, useState } from 'react'
import Box from '@useweb/ui/Box'
import Popover from '@useweb/ui/Popover'
import { useFaviconWithAlert } from '@useweb/change-favicon'
import create from 'zustand'

import BellIcon from '../../../../../../lib/components/icons/BellIcon.js'
import OnlineStatusBadge from '../../../../../../lib/components/basic/OnlineStatusBadge/OnlineStatusBadge.js'
import useNotifications, {
  type UseNotificationsProps,
} from '../../useNotifications/useNotifications.js'
import NotificationsList from '../NotificationsList/NotificationsList.js'

type UseNameStoreProps = {
  show: HTMLElement | null
  setshow: (props: { value: HTMLElement | null }) => any
}

export const useNotificationPopoverStore = create<UseNameStoreProps>((set) => ({
  show: null,
  setshow: ({ value }) => set(() => ({ show: value })),
}))

export type NotificationsPopoverProps = {
  dataConfig?: UseNotificationsProps
}

export default function NotificationsPopover() {
  const notifications = useNotifications()
  const unseenNotifications = useMemo(() => {
    return notifications.get.data?.filter((notification) => !notification.seen)
  }, [notifications.get.data])

  const showNewNotificationBadge = Boolean(unseenNotifications.length)
  const [badgeShown, setBadgeShown] = useState(false)

  useFaviconWithAlert({
    showAlertIcon: badgeShown,
  })

  const notificationsPopoverStore = useNotificationPopoverStore()

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    notificationsPopoverStore.setshow({ value: event.currentTarget })
    setBadgeShown(false)
  }

  const handleClose = () => {
    notificationsPopoverStore.setshow({ value: null })
  }

  return (
    <>
      <Box
        data-id='NotificationsPopoverProps'
        onClick={handleClick}
        className='iconBackground'
        sx={{
          position: 'relative',
        }}
      >
        <BellIcon />

        <OnlineStatusBadge
          show={showNewNotificationBadge}
          sx={{
            top: 0,
            right: 0,
          }}
        />
      </Box>

      <Popover
        open={!!notificationsPopoverStore.show}
        anchorEl={notificationsPopoverStore.show}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: 'transparent',
            border: 'none !important',
            borderRadius: '14px',
            width: {
              xs: '100%',
              md: '400px',
            },
            maxHeight: '400px',
          },
        }}
      >
        <NotificationsList />
      </Popover>
    </>
  )
}
