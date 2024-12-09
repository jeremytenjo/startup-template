import type {
  GetStripeBalanceProps,
  GetStripeBalanceReturn,
} from './getStripeBalance.raw.js'

import nextApi from '@/src/lib/utils/nextjs/nextApi/nextApi'

export type { GetStripeBalanceProps, GetStripeBalanceReturn }

export default async function getStripeBalanceClient(props: GetStripeBalanceProps) {
  const res = await nextApi<GetStripeBalanceReturn, GetStripeBalanceProps>({
    name: 'stripe/getStripeBalance',
    payload: props,
  })

  if (res.error) {
    throw new Error(res.error)
  }

  return res
}
