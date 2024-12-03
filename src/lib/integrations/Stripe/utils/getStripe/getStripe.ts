import Stripe from 'stripe'

export default function getStripe() {
  const stripeSecrectKey =
    process.env.NODE_ENV === 'production'
      ? process.env.STRIPE_SECRET_KEY_PRODUCTION
      : process.env.STRIPE_SECRET_KEY_DEVELOPMENT

  if (!stripeSecrectKey) {
    throw new Error(`Unauthorized access to Stripe API`)
  }

  const stripe = new Stripe(stripeSecrectKey, {
    apiVersion: '2022-11-15',
  })

  return {
    stripe,
  }
}

export type GetStripeReturn = ReturnType<typeof getStripe>
