import React from 'react'
import AsyncTester from '@useweb/async-tester'

// get
import {
  getMessagesList,
  type GetMessagesListProps,
} from '../useMessagesList/useGetMessagesList/useGetMessagesList.js'
// create
// import {
//   createMessagesList,
//   type CreateMessagesListPayloadProps,
// } from '../useMessagesList/useCreateMessagesList/useCreateMessagesList'
// // update
// import {
//   updateMessagesList,
//   type UpdaterPayloadProps,
// } from '../useMessagesList/useUpdateMessagesList/useUpdateMessagesList'
// // remove
// import {
//   removeMessagesList,
//   type RemoveMessagesListProps,
// } from '../useMessagesList/useRemoveMessagesList/useRemoveMessagesList'

export default {
  title: 'data/Messages',
}

export const GetMessages = {
  render: () => {
    const payload: GetMessagesListProps = {
      conversationId: 'direct-conversation-1',
      currentUserUid: 'user1',
    }
    const fn = async () => getMessagesList(payload)
    return <AsyncTester fn={fn} autoExec />
  },
}

// export const CreateMessages = {
//   render: () => {
//     const payload: CreateMessagesListPayloadProps = {}
//     const fn = async () => createMessages(payload)
//     return <AsyncTester fn={fn} autoExec />
//   },
// }

// export const UpdateMessages = {
//   render: () => {
//     const payload: UpdaterPayloadProps = {}
//     const fn = async () => updateMessages(payload)
//     return <AsyncTester fn={fn} autoExec />
//   },
// }

// export const RemoveMessages = {
//   render: () => {
//     const payload: RemoveMessagesListProps = {}
//     const fn = async () => removeMessages(payload)
//     return <AsyncTester fn={fn} autoExec />
//   },
// }
