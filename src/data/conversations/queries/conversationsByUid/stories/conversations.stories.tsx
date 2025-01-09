import React from 'react'
import AsyncTester from '@useweb/async-tester'

// get
import {
  conversationsByUid,
  type GetConversationsProps,
} from '../useConversations/useGetConversations/useGetConversations.js'
// create
// import {
//   createConversation,
//   type CreateConversationsPayloadProps,
// } from '../useConversations/useCreateConversations/useCreateConversations'
// // update
// import {
//   updateConversations,
//   type UpdateConversationsProps,
// } from '../useConversations/useUpdateConversations/useUpdateConversations'
// // remove
// import {
//   removeConversations,
//   type RemoveConversationsProps,
// } from '../useConversations/useRemoveConversations/useRemoveConversations'

export default {
  title: 'data/Conversations',
  parameters: {
    signInAs: 'user1',
  },
}

export const GetConversations = {
  render: () => {
    const payload: GetConversationsProps = { uid: 'user1' }
    const fn = async () => conversationsByUid(payload)
    return <AsyncTester fn={fn} autoExec />
  },
}

// export const CreateConversations = {
//   render: () => {
//     const payload: CreateConversationsPayloadProps = {}
//     const fn = async () => createConversations(payload)
//     return <AsyncTester fn={fn} autoExec />
//   },
// }

// export const UpdateConversations = {
//   render: () => {
//     const payload: UpdateConversationsProps = {}
//     const fn = async () => updateConversations(payload)
//     return <AsyncTester fn={fn} autoExec />
//   },
// }

// export const RemoveConversations = {
//   render: () => {
//     const payload: RemoveConversationsProps = {}
//     const fn = async () => removeConversations(payload)
//     return <AsyncTester fn={fn} autoExec />
//   },
// }
