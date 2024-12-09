import React from 'react'
import AsyncTester from '@useweb/async-tester'

import deleteStripeAccount, {
  type DeleteStripeAccountProps,
} from '../deleteStripeAccount.client.js'

const args: DeleteStripeAccountProps = {
  connectedAccountId: '',
}

export default {
  title: 'Cloud Functions/next/stripe/deleteStripeAccount',
  args,
  parameters: {
    signInAs: false,
  },
}

const fetcher = async (args: DeleteStripeAccountProps) => {
  const data = await deleteStripeAccount(args)

  return data
}

export const Test = (args: DeleteStripeAccountProps) => {
  return (
    <AsyncTester<
      any,
      {
        payload: DeleteStripeAccountProps
      }
    >
      // if using triggerComponent change to async(fnArgs)=> fetcher(fnArgs)
      fn={async () => fetcher(args)}
      autoExec
    />
  )
}
