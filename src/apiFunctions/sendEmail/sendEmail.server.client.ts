import crossFetch from 'cross-fetch'

import type { NextApiProps } from '../../lib/utils/nextjs/nextApi/nextApi.js'

import type { SendEmailProps, SendEmailReturn } from './sendEmail.raw.js'
import sendEmailClient from './sendEmail.client.js'

export type { SendEmailProps, SendEmailReturn }

export default async function sendEmailServerClient(
  props: SendEmailProps & {
    nextApiProps?: Partial<NextApiProps<any>>
  },
) {
  const res = await sendEmailClient({
    nextApiProps: {
      fetchFn: crossFetch,
      isExternalCall: true,
    },
    ...props,
  })

  if (res.error) {
    throw new Error(res.error)
  }

  return res
}
