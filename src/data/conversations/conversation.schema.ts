import type UserSchema from '../users/user.schema.js'

type ConversationSchema = {
  id: string
  members: UserSchema['id'][]
  type: 'direct'
  // used to give admin access to conversation messages
  reported: boolean
}

export default ConversationSchema
