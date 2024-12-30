import type { NextApiRequest } from 'next'

import resetFirebaseEmulatorData, {
  type ResetFirebaseEmulatorDataProps,
} from './resetFirebaseEmulatorData.raw.js'

export type ResetFirebaseEmulatorDataNextProps = {
  req?: NextApiRequest
  body: ResetFirebaseEmulatorDataProps
}

export default async function resetFirebaseEmulatorDataNext(
  props: ResetFirebaseEmulatorDataNextProps,
) {
  try {
    const data = await resetFirebaseEmulatorData({
      ...props.body,
    })

    return data
  } catch (error: any) {
    throw new Error(error, {
      cause: error?.cause,
    })
  }
}
