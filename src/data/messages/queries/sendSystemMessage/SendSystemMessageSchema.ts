import type { SendEmailProps } from '../../../../apiFunctions/sendEmail/sendEmail.raw.js'
import type NotificationSchema from '../../../notifications/notification.schema.js'
import type MessageSchema from '../../message.schema.js'

type SystemMessageUserSchema = {
  id: string
  email: string
  name: string
  photoURL: string
}

type SendSystemMessageSchema = {
  message: Omit<MessageSchema, 'id' | 'isSystemMessage'>
  sender: SystemMessageUserSchema
  receiver: SystemMessageUserSchema
  notificationTitle: string
  notificationProps?: Partial<NotificationSchema>
  emailProps?: SendEmailProps
  disableEmail?: boolean
  disableNotification?: boolean
  dontAddToConversation?: boolean
  forceSendEmail?: boolean
}

export default SendSystemMessageSchema

export const requiredProps: (keyof SendSystemMessageSchema)[] = [
  'message',
  'sender',
  'receiver',
  'notificationTitle',
]
