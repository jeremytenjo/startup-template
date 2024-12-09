import React from 'react'
import AsyncTester from '@useweb/async-tester'

import finishCreatingConnectedAccount, {
  type FinishCreatingConnectedAccountProps,
} from '../finishCreatingConnectedAccount.client.js'
import userStubs from '../../../../data/users/users.stubs.js'

const args: FinishCreatingConnectedAccountProps = {
  refreshUrl: 'hello',
  returnUrl: 'hello',
  userToCreateAccount: userStubs[0],
}

export default {
  title: 'Cloud Functions/next/stripe/finishCreatingConnectedAccount',
  args,
  parameters: {
    signInAs: false,
  },
}

const fetcher = async (args: FinishCreatingConnectedAccountProps) => {
  const data = await finishCreatingConnectedAccount(args)

  return data
}

export const Test = (args: FinishCreatingConnectedAccountProps) => {
  return (
    <AsyncTester<
      any,
      {
        payload: FinishCreatingConnectedAccountProps
      }
    >
      // if using triggerComponent change to async(fnArgs)=> fetcher(fnArgs)
      fn={async () => fetcher(args)}
      autoExec
    />
  )
}
