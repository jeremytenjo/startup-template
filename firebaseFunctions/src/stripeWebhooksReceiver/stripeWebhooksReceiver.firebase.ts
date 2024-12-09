import type { Response } from 'express'
import type { Request } from 'firebase-functions/v2/https'

import logFirebaseCloudFunctionError from '../utils/logFirebaseCloudFunctionError/logFirebaseCloudFunctionError.js'

import validateStripeWebhookRequest from './utils/validateStripeWebhookRequest/validateStripeWebhookRequest.js'
import stripeWebhooksReceiver from './stripeWebhooksReceiver.js'

export type StripeWebhooksReceiverProps = {
  req: Request
  res: Response
}

export default async function stripeWebhooksReceiverFirebase(
  props: StripeWebhooksReceiverProps,
) {
  props.res.set('Access-Control-Allow-Origin', '*')

  try {
    const payload = await validateStripeWebhookRequest({
      req: props.req,
    })

    if (payload.endEarly) {
      props.res.status(200).json({ data: undefined, error: undefined })
      return
    }

    const data = await stripeWebhooksReceiver(payload)
    props.res.status(200).json({ data, error: undefined })
  } catch (error: any) {
    logFirebaseCloudFunctionError({
      fnName: 'stripeWebhooksReceiver',
      description: error,
      metadata: error?.cause,
    })

    props.res.status(500).json({
      error: error.toString(),
    })
  }
}
