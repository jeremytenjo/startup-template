import type { NextApiRequest } from 'next'

import finishCreatingConnectedAccount, {
  type FinishCreatingConnectedAccountProps,
} from './finishCreatingConnectedAccount.raw.js'

export type FinishCreatingConnectedAccountNextProps = {
  req?: NextApiRequest
  body: FinishCreatingConnectedAccountProps
}

export default async function finishCreatingConnectedAccount_next(
  props: FinishCreatingConnectedAccountNextProps,
) {
  try {
    const data = await finishCreatingConnectedAccount({
      ...props.body,
    })

    return data
  } catch (error: any) {
    throw new Error(error)
  }
}
