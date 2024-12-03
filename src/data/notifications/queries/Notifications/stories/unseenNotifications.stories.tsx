import React from 'react'
import AsyncTester from '@useweb/async-tester'

// get
import {
  getNotifications,
  type GetNotificationsProps,
} from '../useNotifications/useGetNotifications/useGetNotifications.js'
// create
// import {
//   createNotifications,
//   type CreateNotificationsProps,
// } from '../useNotifications/useCreateNotifications/useCreateNotifications'
// // update
// import {
//   updateNotifications,
//   type UpdateNotificationsProps,
// } from '../useNotifications/useUpdateNotifications/useUpdateNotifications'
// // remove
// import {
//   removeNotifications,
//   type RemoveNotificationsProps,
// } from '../useNotifications/useRemoveNotifications/useRemoveNotifications'

export default {
  title: 'data/notifications/queries/NotificationsList',
}

export const GetNotifications = {
  render: () => {
    const payload: GetNotificationsProps = {
      uid: 'creator1',
    }
    const fn = async () => getNotifications(payload)
    return <AsyncTester fn={fn} autoExec />
  },
}

// export const CreateNotifications = {
//   render: () => {
//     const payload: CreateNotificationsProps = {}
//     const fn = async () => createNotifications(payload)
//     return <AsyncTester fn={fn} autoExec />
//   },
// }

// export const UpdateNotifications = {
//   render: () => {
//     const payload: UpdateNotificationsProps = {}
//     const fn = async () => updateNotifications(payload)
//     return <AsyncTester fn={fn} autoExec />
//   },
// }

// export const RemoveNotifications = {
//   render: () => {
//     const payload: RemoveNotificationsProps = {}
//     const fn = async () => removeNotifications(payload)
//     return <AsyncTester fn={fn} autoExec />
//   },
// }
