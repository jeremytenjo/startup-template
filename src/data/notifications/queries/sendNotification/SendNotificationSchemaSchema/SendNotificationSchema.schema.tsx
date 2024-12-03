import type NotificationSchema from '../../../notification.schema.js'

type SendNotificationSchemaSchema = { notification: Omit<NotificationSchema, 'id'> }

export default SendNotificationSchemaSchema
