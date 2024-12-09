import type { NextApiRequest } from 'next'

import getStripeBalance, { type GetStripeBalanceProps } from './getStripeBalance.raw.js'

export type GetStripeBalanceNextProps = {
  req?: NextApiRequest
  body: GetStripeBalanceProps
}

export default async function getStripeBalance_next(props: GetStripeBalanceNextProps) {
  try {
    const data = await getStripeBalance({
      ...props.body,
    })

    return data
  } catch (error: any) {
    throw new Error(error, {
      cause: error?.cause || {},
    })
  }
}
