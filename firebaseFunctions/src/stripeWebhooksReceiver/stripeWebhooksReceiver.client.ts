import { googleCloudFunction } from '@useweb/firebase/useFirebaseFunction'
import firebaseConfig from '@/src/lib/integrations/Google/Firebase/firebase.config'

import type {
  StripeWebhooksReceiverProps,
  StripeWebhooksReceiverReturn,
} from './stripeWebhooksReceiver.js'

export default async function stripeWebhooksReceiverClient(
  props: StripeWebhooksReceiverProps,
) {
  const res = await googleCloudFunction<
    StripeWebhooksReceiverProps,
    {
      data: StripeWebhooksReceiverReturn
    }
  >({
    name: 'stripeWebhooksReceiver',
    firebase: {
      firebaseConfig: firebaseConfig,
      envIsDev: process.env.NODE_ENV === 'development',
    },
    options: {
      payload: props,
    },
  })

  return res
}
