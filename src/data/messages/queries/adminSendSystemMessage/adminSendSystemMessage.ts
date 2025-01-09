import assert from '@useweb/assert'
import { getToday } from '@useweb/date'

import type UserSchema from '../../../users/user.schema.js'
import logError from '../../../../lib/utils/loggers/logError/logError.js'
import sendSystemMessage from '../sendSystemMessage/sendSystemMessage.js'
import { websiteAdmin } from '../../../../../firebaseFunctions/constants.js'
import appConfig from '../../../../../app.config.js'

export type AdminSendSystemMessageProps = {
  user: UserSchema
  message: string
}

export default async function adminSendSystemMessage(props: AdminSendSystemMessageProps) {
  assert<AdminSendSystemMessageProps>({ props, requiredProps: ['user'] })

  // send system message
  try {
    const title = `Message from ${appConfig.siteInfo.name}`
    const body = props.message

    await sendSystemMessage({
      sender: {
        id: websiteAdmin.id,
        name: websiteAdmin.photoURL,
        photoURL: websiteAdmin.photoURL,
        email: '',
      },
      receiver: {
        id: props.user.id,
        name: props.user.displayName,
        photoURL: props.user?.profilePhoto?.src || '',
        email: props.user.email,
      },
      notificationTitle: title,
      message: {
        conversationId: '',
        body,
        moreText: body,
        seenBy: websiteAdmin.id,
        senderUid: websiteAdmin.id,
        sentDate: getToday(),
      },
    })
  } catch (error: any) {
    logError({
      error,
      fnName: 'adminSendSystemMessage - sendSystemMessage',
      metadata: { props },
    })
  }
}

export type AdminSendSystemMessageReturn = ReturnType<typeof adminSendSystemMessage>
