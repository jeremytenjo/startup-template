import { onCall, onRequest } from 'firebase-functions/v2/https'

import miscFunctionsFirebase from './miscFunctions/miscFunctions.firebase.js'
import stripeWebhooksReceiverFirebase from './stripeWebhooksReceiver/stripeWebhooksReceiver.firebase.js'

// miscFunctions
export const miscFunctions = onCall(
  {
    memory: '1GiB',
  },
  async (request) => await miscFunctionsFirebase({ request }),
)

// stripeWebhooksReceiver
export const stripeWebhooksReceiver = onRequest(
  async (req, res) => await stripeWebhooksReceiverFirebase({ req, res }),
)
