import type {
  FinishCreatingConnectedAccountProps,
  FinishCreatingConnectedAccountReturn,
} from './finishCreatingConnectedAccount.raw.js'

import nextApi from '@/src/lib/utils/nextjs/nextApi/nextApi'

export type { FinishCreatingConnectedAccountProps, FinishCreatingConnectedAccountReturn }

export default async function finishCreatingConnectedAccountClient(
  props: FinishCreatingConnectedAccountProps,
) {
  const res = await nextApi<
    FinishCreatingConnectedAccountReturn,
    FinishCreatingConnectedAccountProps
  >({
    name: 'stripe/finishCreatingConnectedAccount',
    payload: props,
  })

  if (res.error) {
    throw new Error(res.error)
  }

  return res
}
