import React from 'react'
import AsyncTester from '@useweb/async-tester'

import resetFirebaseEmulatorData, {
  type ResetFirebaseEmulatorDataProps,
} from '../resetFirebaseEmulatorData.client.js'

const args: ResetFirebaseEmulatorDataProps = {
  name: 'hello',
}

export default {
  title: 'Cloud Functions/next/resetFirebaseEmulatorData',
  args,
  parameters: {
    signInAs: false,
  },
}

const fetcher = async (args: ResetFirebaseEmulatorDataProps) => {
  const data = await resetFirebaseEmulatorData(args)

  return data
}

export const Test = (args: ResetFirebaseEmulatorDataProps) => {
  return (
    <AsyncTester<
      any,
      {
        payload: ResetFirebaseEmulatorDataProps
      }
    >
      // if using triggerComponent change to async(fnArgs)=> fetcher(fnArgs)
      fn={async () => fetcher(args)}
      autoExec
    />
  )
}
