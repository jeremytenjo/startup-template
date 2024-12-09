import type {
  DeleteStripeAccountProps,
  DeleteStripeAccountReturn,
} from './deleteStripeAccount.raw.js'

import nextApi from '@/src/lib/utils/nextjs/nextApi/nextApi'

export type { DeleteStripeAccountProps, DeleteStripeAccountReturn }

export default async function deleteStripeAccountClient(props: DeleteStripeAccountProps) {
  const res = await nextApi<DeleteStripeAccountReturn, DeleteStripeAccountProps>({
    name: 'stripe/deleteStripeAccount',
    payload: props,
  })

  if (res.error) {
    throw new Error(res.error)
  }

  return res
}
