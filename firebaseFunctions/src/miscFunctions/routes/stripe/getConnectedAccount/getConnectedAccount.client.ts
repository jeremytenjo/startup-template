import type {
  GetConnectedAccountProps,
  GetConnectedAccountReturn,
} from './getConnectedAccount.raw.js'

import nextApi from '@/src/lib/utils/nextjs/nextApi/nextApi'

export type { GetConnectedAccountProps, GetConnectedAccountReturn }

export default async function getConnectedAccountClient(props: GetConnectedAccountProps) {
  const res = await nextApi<GetConnectedAccountReturn, GetConnectedAccountProps>({
    name: 'stripe/getConnectedAccount',
    payload: props,
  })

  if (res.error) {
    throw new Error(res.error)
  }

  return res
}
