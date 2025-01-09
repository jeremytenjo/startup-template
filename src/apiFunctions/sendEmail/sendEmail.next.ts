import type { NextApiRequest } from 'next'

import sendEmail, { type SendEmailProps } from './sendEmail.raw.js'

export type SendEmailNextProps = {
  req?: NextApiRequest
  body: SendEmailProps
}

export default async function sendEmail_next(props: SendEmailNextProps) {
  console.log('Sending email', {
    to: props.body.to,
    from: props.body.from,
    subject: props.body.subject,
    template: props.body.template?.props || ('no template' as any),
  } satisfies SendEmailProps)

  try {
    const data = await sendEmail({
      ...props.body,
    })

    return data
  } catch (error: any) {
    throw new Error(error, {
      cause: error?.cause,
    })
  }
}
