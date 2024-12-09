import React from 'react'
import FirebaseFunctionTester, {
  type FirebaseFunctionTesterProps,
} from '@useweb/firebase-function-tester'

import type { StripeWebhooksReceiverProps } from '../stripeWebhooksReceiver.js'

type ArgsProps = FirebaseFunctionTesterProps<any, StripeWebhooksReceiverProps>

const args: ArgsProps = {
  functionName: 'stripeWebhooksReceiver',
  payload: {} as any,
}

export default {
  title: 'Cloud Functions/firebase/stripe/stripeWebhooksReceiver',
  args,
}

export const Default = {
  render: (args: ArgsProps) => {
    return <FirebaseFunctionTester {...args} />
  },
}
