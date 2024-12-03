import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Button from '@useweb/ui/Button'
import { useDataCache } from '@useweb/use-data'
import useAsync from '@useweb/use-async'
import CircularProgress from '@mui/material/CircularProgress'

import DoubleCheckmark from '../../../../../../../../lib/components/icons/DoubleCheckmark/DoubleCheckmark.js'
import useNotifications, {
  getUseNotificationsDataId,
} from '../../../../useNotifications/useNotifications.js'
import { useNotificationPopoverStore } from '../../../NotificationsPopover/NotificationsPopover.js'
import useAuth from '../../../../../../../users/utils/useAuth/useAuth.js'
import type NotificationSchema from '../../../../../../notification.schema.js'

export default function NotificationsHeader() {
  const dataCache = useDataCache()
  const auth = useAuth()
  const notifications = useNotifications()
  const hasUnseen = notifications.get.data.some((n) => n.seen === false)

  const setAllNotificationsToSeen = useAsync({
    fn: async () => {
      await Promise.all(
        notifications.get.data.map(async (n) => {
          if (!n.seen) {
            await notifications.update.exec({
              value: {
                ...n,
                seen: true,
              },
            })
          }
        }),
      )

      dataCache.mutate<NotificationSchema>({
        id: getUseNotificationsDataId({
          currentUid: auth.user.id,
        }),
        method: 'clear',
        data: {} as any,
      })

      useNotificationPopoverStore.setState({
        show: null,
      })
    },
  })

  return (
    <Box
      data-id='NotificationsHeader'
      sx={{
        display: 'grid',
        width: '100%',
        height: '50px',
        gridAutoFlow: 'column',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between',
        paddingLeft: '15px',
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingRight: '15px',
        position: 'relative',
      }}
    >
      <NotificationsText />

      {setAllNotificationsToSeen.loading && (
        <Box
          data-id='LoadingScreen'
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            backgroundColor: 'neutral.600',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            zIndex: 1,
          }}
        >
          <Text
            text={`Archiving Notifications`}
            tag='p'
            sx={{
              fontWeight: 'bold',
              color: 'neutral.100',
            }}
          />
          <CircularProgress size={20} />
        </Box>
      )}

      {!!hasUnseen && (
        <Button
          onClick={setAllNotificationsToSeen.exec}
          name='MarkAllAsReadButton'
          variant='text'
          sx={{
            color: 'primary.main',
            fontWeight: '600',
            fontSize: [12, , 13],
            display: 'flex',
            gap: 1,
            border: 'transparent !important',
            px: '0 !important',
            backgroundColor: 'transparent !important',
          }}
        >
          <DoubleCheckmark
            sx={{
              width: '1.0em',
              height: '1.0em',
            }}
          />
          Mark all as read
        </Button>
      )}
    </Box>
  )
}

const NotificationsText = () => {
  return (
    <Text
      text={`Notifications`}
      sx={{
        color: 'neutral.100',
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '20px',
        textAlign: 'left',
      }}
    />
  )
}
