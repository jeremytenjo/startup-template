import assert from '@useweb/assert'

import sendEmailClient from '../../../../apiFunctions/sendEmail/sendEmail.client.js'
import logError from '../../../../lib/utils/loggers/logError/logError.js'
import resendConfig from '../../../../lib/integrations/Resend/resend.config.js'
import { adminApiConfig } from '../../../../../firebaseFunctions/src/adminApi/adminApi.config.js'

type EmailUserSchema = {
  id: string
  email: string
  name: string
  photoURL: string
}

export type ValidateMessageProps = {
  message: string
  sender: EmailUserSchema
  receiver: EmailUserSchema
}

export default async function validateMessage(props: ValidateMessageProps) {
  assert<ValidateMessageProps>({ props, requiredProps: ['message'] })

  const issues: {
    description: string
  }[] = []

  if (props.message?.includes('discord') || props.message?.includes('Discord')) {
    issues.push({
      description: 'Discord mentioned in message',
    })
  }

  if (
    props.message?.includes('off site') ||
    props.message?.includes('off-site') ||
    props.message?.includes('offsite')
  ) {
    issues.push({
      description: 'Off site mentioned in message',
    })
  }

  if (issues.length) {
    // send email to admin
    try {
      await sendEmailClient({
        to: adminApiConfig.admins.map((a) => a.email),
        from: 'alerts',
        subject: 'Issue found in message',
        template: {
          props: {
            receiverName: resendConfig.senders.alerts,
            senderImageUrl: props.sender?.photoURL,
            title: 'Issue found in message',
            body: `Message: ${props.message}
Issues: ${issues.map((issue) => issue.description).join('\n')}

Sender: ${props.sender?.name} - ${props.sender?.id}

Receiver: ${props.receiver?.name} - ${props.receiver?.id}

`,
          },
        },
      })
    } catch (error: any) {
      logError({
        error,
        fnName: 'validateMessage',
        metadata: { props },
      })
    }
  }
}

export type ValidateMessageReturn = ReturnType<typeof validateMessage>
