import type Stripe from 'stripe'
import assert from '@useweb/assert'
import { type Request } from 'firebase-functions/lib/common/providers/https.js'
import logger from 'firebase-functions/logger'

import getStripe from '../../../../../src/lib/integrations/Stripe/utils/getStripe/getStripe.js'

export type ValidateStripeWebhookRequestProps = { req: Request }

export default async function validateStripeWebhookRequest(
  props: ValidateStripeWebhookRequestProps,
): ValidateStripeWebhookRequestReturn {
  assert<ValidateStripeWebhookRequestProps>({ props, requiredProps: [] })

  if (process.env.NODE_ENV === 'development') {
    return { stripeEvent: props.req.body }
  }

  // stripeWebhooksReceiver is triggered twice when developing locally. This prevents the proudction trigger to do anything.
  if (process.env.NODE_ENV === 'production' && !props.req.body?.livemode) {
    logger.info(`Stopped early because this is sent from local development`, {
      reqBody: props.req.body,
      NODE_ENV: process.env.NODE_ENV,
    })

    return {
      stripeEvent: props.req.body,
      endEarly: true,
    }
  }

  try {
    // update webhook signing secret if webhook compromised or updated
    const stripeWebhookSigningSecret =
      process.env.STRIPE_SIGNING_SECERT_STRIPE_WEBHOOK_RECEIVER_PRODUCTION

    if (!stripeWebhookSigningSecret) {
      throw new Error('missing stripeWebhookSigningSecret')
    }

    const sig = props.req.headers['stripe-signature']

    if (!sig) {
      throw new Error('missing sig (stripe-signature)')
    }

    const { stripe } = getStripe()

    const stripeEvent: Stripe.Event = stripe.webhooks.constructEvent(
      props.req.rawBody,
      sig,
      stripeWebhookSigningSecret,
    )

    return { stripeEvent }
  } catch (error: any) {
    throw new Error(`validateStripeWebhookRequest. ${error}`, {
      cause: {
        props,
      },
    })
  }
}

export type ValidateStripeWebhookRequestReturn = Promise<{
  stripeEvent: Stripe.Event
  endEarly?: boolean
}>
