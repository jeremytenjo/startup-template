import React from 'react'
import AsyncTester from '@useweb/async-tester'

import getStripeConnectedAccountDashboardLink, {
  type GetStripeConnectedAccountDashboardLinkProps,
} from '../getStripeConnectedAccountDashboardLink.client.js'

const args: GetStripeConnectedAccountDashboardLinkProps = {
  connectedAccountId: '',
}

export default {
  title: 'Cloud Functions/next/stripe/getStripeConnectedAccountDashboardLink',
  args,
  parameters: {
    signInAs: false,
  },
}

const fetcher = async (args: GetStripeConnectedAccountDashboardLinkProps) => {
  const data = await getStripeConnectedAccountDashboardLink(args)

  return data
}

export const Test = (args: GetStripeConnectedAccountDashboardLinkProps) => {
  return (
    <AsyncTester<
      any,
      {
        payload: GetStripeConnectedAccountDashboardLinkProps
      }
    >
      // if using triggerComponent change to async(fnArgs)=> fetcher(fnArgs)
      fn={async () => fetcher(args)}
      autoExec
    />
  )
}
