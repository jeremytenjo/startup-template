import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getStripeBalance, {
  type GetStripeBalanceProps,
} from '../getStripeBalance.client.js'

const args: GetStripeBalanceProps = {
  connectedAccountId: '',
}

export default {
  title: 'Cloud Functions/next/stripe/getStripeBalance',
  args,
  parameters: {
    signInAs: false,
  },
}

const fetcher = async (args: GetStripeBalanceProps) => {
  const data = await getStripeBalance(args)

  return data
}

export const Test = (args: GetStripeBalanceProps) => {
  return (
    <AsyncTester<
      any,
      {
        payload: GetStripeBalanceProps
      }
    >
      // if using triggerComponent change to async(fnArgs)=> fetcher(fnArgs)
      fn={async () => fetcher(args)}
      autoExec
    />
  )
}
