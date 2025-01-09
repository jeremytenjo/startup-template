import { Resend } from 'resend'
import assert from '@useweb/assert'

import resendConfig from '../../lib/integrations/Resend/resend.config.js'
import appConfig from '../../../app.config.js'

import BasicEmailTemplate, {
  type BasicEmailTemplateProps,
} from './templates/BasicEmailTemplate/BasicEmailTemplate.js'

const isProduction = process.env.NODE_ENV === 'production'

const resend = new Resend(process.env.RESEND_API_KEY)

export type SendEmailProps = {
  to: string[]
  from: keyof typeof resendConfig.senders
  subject: string
  template?: {
    props: BasicEmailTemplateProps
  }
}

export default async function sendEmailRaw(props: SendEmailProps) {
  if (!isProduction || !appConfig.featureFlags?.email?.enabled) {
    return {
      message: 'Email not sent because feature flag is disabled or not in production',
    }
  }

  const template = BasicEmailTemplate({
    ...(props.template?.props || ({} as any)),
  })

  const emailProps = {
    to: props.to,
    from: `${appConfig.siteInfo.name} <${resendConfig.senders[props.from]}>`,
    subject: props.subject?.replaceAll('\\n', ''),
    react: template,
  }

  try {
    assert({
      props: emailProps,
      requiredProps: ['to', 'from', 'subject'],
    })
    const data = await resend.emails.send(emailProps)

    console.log(`Email sent successfully`, JSON.stringify(emailProps))

    return data
  } catch (error: any) {
    throw new Error(
      String(error) + ' - ' + JSON.stringify(error) + ' - ' + JSON.stringify(emailProps),
      {
        cause: {
          cause: error.cause,
          props,
        },
      },
    )
  }
}

export type SendEmailReturn = ReturnType<typeof sendEmailRaw>
