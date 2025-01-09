import type ConversationSchema from './conversation.schema.js'

const ConversationsStubs: ConversationSchema[] = [
  {
    id: 'direct-conversation-1',
    members: ['user1', 'developer1'],
  },
  {
    id: 'direct-conversation-2',
    members: ['user1', 'creator2'],
  },
  {
    id: 'direct-conversation-3',
    members: ['user1', 'developer2'],
  },
]

export default ConversationsStubs
