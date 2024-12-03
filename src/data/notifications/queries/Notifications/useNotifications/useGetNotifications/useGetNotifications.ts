import { type UseDataProps } from '@useweb/use-data'
import assert from '@useweb/assert'
import type { QueryConstraint } from 'firebase/firestore'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'

import type NotificationSchema from '../../../../notification.schema.js'
import useAuth from '../../../../../users/utils/useAuth/useAuth.js'
import type UserSchema from '../../../../../users/user.schema.js'
import logError from '../../../../../../lib/utils/loggers/logError/logError.js'
import { notificationsCollectionName } from '../../../../notifications.config.js'
import { db } from '../../../../../../lib/integrations/Google/Firebase/firebase.js'

// fetcher
export type GetNotificationsProps = {
  uid: UserSchema['id']
}

// notifications are added from other sources (e.g. conversation messages)
export const getNotifications = async (props: GetNotificationsProps = { uid: '' }) => {
  assert({ props, requiredProps: ['uid'] })

  const notifictations: NotificationSchema[] = []
  const constraints: QueryConstraint[] = []

  const coll = collection(db, notificationsCollectionName)

  constraints.push(where('receiverUid', '==', props.uid))
  constraints.push(where('seen', '==', false))
  constraints.push(orderBy('sentDate', 'desc'))

  const q = query(coll, ...constraints)

  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    notifictations.push(doc.data() as NotificationSchema)
  })

  return notifictations
}

// hook
type useGetNotificationsProps = UseDataProps<
  NotificationSchema,
  GetNotificationsProps
>['get']
type useGetNotificationsReturn = UseDataProps<
  NotificationSchema,
  GetNotificationsProps
>['get']

export default function useGetNotifications(
  props: useGetNotificationsProps,
): useGetNotificationsReturn {
  const auth = useAuth()

  const get: useGetNotificationsReturn = {
    ...props,
    fetcher: getNotifications,
    fetcherPayload: {
      uid: auth.user?.id,
    },

    onGet: (result) => {
      props?.onGet && props.onGet(result)
    },

    onGetError: (error) => {
      logError({
        error: error.error,
        fnName: 'useGetNotifications',
        metadata: { props },
      })
      props?.onGetError && props.onGetError(error)
    },
  }

  return get
}
