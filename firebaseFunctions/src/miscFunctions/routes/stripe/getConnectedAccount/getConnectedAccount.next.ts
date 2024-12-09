import type { NextApiRequest } from 'next'

import getConnectedAccount, {
  type GetConnectedAccountProps,
} from './getConnectedAccount.raw.js'

export type GetConnectedAccountNextProps = {
  req?: NextApiRequest
  body: GetConnectedAccountProps
}

export default async function getConnectedAccount_next(
  props: GetConnectedAccountNextProps,
) {
  try {
    const data = await getConnectedAccount({
      ...props.body,
    })

    return data
  } catch (error: any) {
    throw new Error(error, {
      cause: error?.cause || {},
    })
  }
}
