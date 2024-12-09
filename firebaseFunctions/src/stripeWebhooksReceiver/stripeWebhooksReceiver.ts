import type Stripe from 'stripe'
import logger from 'firebase-functions/logger'

import type { ValidateStripeWebhookRequestReturn } from './utils/validateStripeWebhookRequest/validateStripeWebhookRequest.js'

export type StripeWebhooksReceiverProps = Awaited<ValidateStripeWebhookRequestReturn>
export type StripeWebhooksReceiverReturn = {
  success: boolean
}

export default async function stripeWebhooksReceiver(
  props: StripeWebhooksReceiverProps,
): Promise<StripeWebhooksReceiverReturn> {
  const stripeEventData = props.stripeEvent.data.object as Stripe.PaymentIntent

  logger.info('Received Stripe Webhook Event', {
    Stripe_Webhook_Event_Name: props.stripeEvent.type,
    stripeEventData: process.env.NODE_ENV === 'development' ? '' : stripeEventData,
    stripeEvent: props?.stripeEvent,
    NODE_ENV: process.env.NODE_ENV,
  })

  if (props.stripeEvent.type === 'payment_intent.succeeded') {
  }

  if (props.stripeEvent.type === 'payment_intent.payment_failed') {
  }

  return {
    success: true,
  }
}
