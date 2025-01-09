import type ConversationSchema from './conversation.schema.js'

const ConversationsStubs: ConversationSchema[] = [
  {
    id: 'direct-conversation-1',
    members: ['user1', 'developer1'],
    type: 'direct',
    reported: false,
  },
  {
    id: 'direct-conversation-2',
    members: ['user1', 'creator2'],
    type: 'direct',
    reported: false,
  },
  {
    id: 'direct-conversation-3',
    members: ['user1', 'developer2'],
    type: 'direct',
    reported: false,
  },
]

export default ConversationsStubs
