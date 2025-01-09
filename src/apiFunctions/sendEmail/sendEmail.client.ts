import type { NextApiProps } from '../../lib/utils/nextjs/nextApi/nextApi.js'
import nextApi from '../../lib/utils/nextjs/nextApi/nextApi.js'

import type { SendEmailProps, SendEmailReturn } from './sendEmail.raw.js'

export type { SendEmailProps, SendEmailReturn }

export default async function sendEmailClient(
  props: SendEmailProps & {
    nextApiProps?: Partial<NextApiProps<any>>
  },
) {
  const { nextApiProps, ...payload } = props || {}
  const res = await nextApi<SendEmailReturn, SendEmailProps>({
    name: 'sendEmail',
    payload,
    ...nextApiProps,
  })

  if (res.error) {
    throw new Error(res.error, {
      cause: { res, props },
    })
  }

  return res
}
