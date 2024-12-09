import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getConnectedAccount, {
  type GetConnectedAccountProps,
} from '../getConnectedAccount.client.js'

const args: GetConnectedAccountProps = {
  connectedAccountId: 'acct_1NdeNT4csKxYc0sk',
}

export default {
  title: 'Cloud Functions/next/stripe/getConnectedAccount',
  args,
  parameters: {
    signInAs: false,
  },
}

const fetcher = async (args: GetConnectedAccountProps) => {
  const data = await getConnectedAccount(args)

  return data
}

export const Test = (args: GetConnectedAccountProps) => {
  return (
    <AsyncTester<
      any,
      {
        payload: GetConnectedAccountProps
      }
    >
      // if using triggerComponent change to async(fnArgs)=> fetcher(fnArgs)
      fn={async () => fetcher(args)}
      autoExec
    />
  )
}
