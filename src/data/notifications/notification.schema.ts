import type DateSchema from '../_commonSchemas/DateSchema/date.schema.js'
import type UserSchema from '../users/user.schema.js'

type NotificationSchema = {
  id: string
  senderUid: UserSchema['id']
  receiverUid: UserSchema['id'] | false
  imageUrl: string
  title: string
  sentDate: DateSchema
  seen: boolean
  message?: string
  href?: string
  ctas?: {
    label: string
    href: string
  }[]
  multilineBody?: boolean
  onRecieveActions?: {
    // use when sending message betweet users and the user is on the page and does not need to see the notification pop in, they already see it coming in the chat
    setToSeenAndHideSnackbarIfReceiverUrlEquals?: string
  }
  jobId?: string | false
  gameZoneAdId?: string | false
}

export default NotificationSchema
