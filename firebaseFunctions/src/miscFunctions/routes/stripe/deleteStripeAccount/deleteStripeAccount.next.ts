import type { NextApiRequest } from 'next'

import deleteStripeAccount, {
  type DeleteStripeAccountProps,
} from './deleteStripeAccount.raw.js'

export type DeleteStripeAccountNextProps = {
  req?: NextApiRequest
  body: DeleteStripeAccountProps
}

export default async function deleteStripeAccount_next(
  props: DeleteStripeAccountNextProps,
) {
  try {
    const data = await deleteStripeAccount({
      ...props.body,
    })

    return data
  } catch (error: any) {
    throw new Error(error, {
      cause: error?.cause || {},
    })
  }
}
