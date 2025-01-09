import type UserSchema from '../users/user.schema.js'
import type AttachmentSchema from '../_commonSchemas/AttachmentSchema/Attachment.schema.js'
import type CtaSchema from '../_commonSchemas/CtaSchema/Cta.schema.js'
import type DateSchema from '../_commonSchemas/DateSchema/date.schema.js'

type MessageSchema = {
  // temp id, in order for useDate to update the item
  id: string
  conversationId: string
  senderUid: UserSchema['id']
  sentDate: DateSchema
  body: string | undefined
  title?: string | false
  moreText?: string | false
  // seenBy is the same as senderUid or senderUid+current signed in user. eg seenBy = user1 means developer1 has not seen the message, user1developer1 means developer1 has seen the message as well
  seenBy: string
  isSystemMessage?: boolean
  isTheBloxMarketMessage?: boolean
  attachments?: AttachmentSchema[]
  ctas?: CtaSchema[]
  showInNotificationsPanel?: boolean
  // props to add to update firestore
  saveToFirestore?: boolean
  rawAttachments?: RawAttachments
  // props to handle seen by current user
  updateSeenByCurrentUser?: boolean
  systemMessageProps?: {
    showToSenderImmediately?: boolean
    hideCtas?: boolean
    // components to render in the notification and sytem message
    components?: {
      // add custom components here
    }
  }
}

export type RawAttachments = {
  id: string
  file: File
}[]

export default MessageSchema
