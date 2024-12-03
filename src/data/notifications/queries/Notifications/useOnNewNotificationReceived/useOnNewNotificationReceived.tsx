import React, { useEffect } from 'react'
import { collection, limit, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { getToday } from '@useweb/date'
import useSnackbar from '@useweb/ui/Snackbar'
import Link from '@useweb/ui/Link'
import Button from '@useweb/ui/Button'
import { useDataCache } from '@useweb/use-data'

import useAuth from '../../../../users/utils/useAuth/useAuth.js'
import type NotificationSchema from '../../../notification.schema.js'
import logError from '../../../../../lib/utils/loggers/logError/logError.js'
import { db } from '../../../../../lib/integrations/Google/Firebase/firebase.js'
import { notificationsCollectionName } from '../../../notifications.config.js'
import { getUseNotificationsDataId } from '../useNotifications/useNotifications.js'
import { updateNotifications } from '../useNotifications/useUpdateNotifications/useUpdateNotifications.js'

export default function useOnNewNotificationReceived() {
  const auth = useAuth()
  const snackbar = useSnackbar()
  const dataCache = useDataCache()

  const onNotificationClick = async (p: { newNotification: NotificationSchema }) => {
    // mark as seen
    await updateNotifications({
      value: {
        ...p.newNotification,
        seen: true,
      },
    })

    // remove from notification list
    const UseGetNotificationDataId = getUseNotificationsDataId({
      currentUid: auth.user?.id,
    })

    dataCache.mutate({
      id: UseGetNotificationDataId,
      method: 'remove',
      data: p.newNotification,
    })
  }

  useEffect(() => {
    if (auth?.user?.id) {
      const listenAfter = getToday()
      // listen to new notifications
      const q = query(
        collection(db, notificationsCollectionName),
        where('receiverUid' satisfies keyof NotificationSchema, '==', auth.user?.id),
        where('seen' satisfies keyof NotificationSchema, '==', false),
        where('sentDate' satisfies keyof NotificationSchema, '>=', listenAfter),
        orderBy('sentDate' satisfies keyof NotificationSchema, 'desc'),
        limit(1),
      )

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            if (change.type === 'added') {
              const newNotification: NotificationSchema =
                change.doc.data() as NotificationSchema

              // add to notifcation list
              const UseGetNotificationDataId = getUseNotificationsDataId({
                currentUid: auth.user?.id,
              })

              dataCache.mutate({
                id: UseGetNotificationDataId,
                method: 'add',
                data: newNotification,
              })

              if (
                newNotification?.onRecieveActions
                  ?.setToSeenAndHideSnackbarIfReceiverUrlEquals &&
                location.pathname?.includes(
                  newNotification?.onRecieveActions
                    ?.setToSeenAndHideSnackbarIfReceiverUrlEquals,
                )
              ) {
                // mark as seen
                await onNotificationClick({
                  newNotification,
                })

                return true
              }

              snackbar.show({
                title: newNotification.title,
                message: newNotification.message,
                autoHideDuration: 30000,
                ctas: newNotification?.ctas?.map((cta) => ({
                  label: cta.label,
                  component: (
                    <>
                      <Link
                        href={cta.href}
                        onClick={() =>
                          onNotificationClick({
                            newNotification,
                          })
                        }
                      >
                        <Button name='Button' variant='green' sx={{}}>
                          {cta.label}
                        </Button>
                      </Link>
                    </>
                  ),
                })),
              })
            }
          })
        },
        (error) => {
          logError({
            error,
            fnName: `useOnNewNotificationReceived: Error listening to new notifications for ${auth.user?.id}`,
            metadata: {},
            ignoreErrorIf: (p) => {
              return {
                ignore: String(p.e).includes('code=permission-denied'),
              }
            },
          })
        },
      )

      return () => {
        unsubscribe()
      }
    }
  }, [auth?.user?.id])
}

export type UseOnNewNotificationReceivedReturn = ReturnType<
  typeof useOnNewNotificationReceived
>
