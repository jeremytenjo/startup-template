import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import type Stripe from 'stripe'
import { Elements } from '@stripe/react-stripe-js'
import ErrorMessage from '@useweb/ui/ErrorMessage'

import useStripePaymentStatus from '../../utils/useStripePaymentStatus/useStripePaymentStatus.js'

import type { StripePaymentCardFormProps } from './components/StripePaymentCardForm/StripePaymentCardForm.js'
import StripePaymentCardForm from './components/StripePaymentCardForm/StripePaymentCardForm.js'

const stripePublishableKey =
  process.env.NODE_ENV === 'production'
    ? (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_PRODUCTION as string)
    : (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_DEVELOPMENT as string)

if (!stripePublishableKey) {
  throw new Error(
    `missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_PRODUCTION or NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_DEVELOPMENT
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_PRODUCTION = ${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_PRODUCTION}
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_DEVELOPMENT = ${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_DEVELOPMENT} 
    
    NODE_ENV = ${process.env.NODE_ENV}
    
    `,
  )
}

const stripePromise = loadStripe(stripePublishableKey)

export type StripePaymentCardProps = {
  clientSecret: Stripe.PaymentIntent['client_secret'] | undefined
  createdPaymentIntent: Stripe.Response<Stripe.PaymentIntent> | undefined
  paymentCardFormProps: Omit<StripePaymentCardFormProps, 'createdPaymentIntent'>
  succeededComponent: any
}

export default function StripePaymentCard(props: StripePaymentCardProps) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: props.clientSecret || undefined,
      }}
    >
      <StripePaymentCardContent {...props} />
    </Elements>
  )
}

function StripePaymentCardContent(props: StripePaymentCardProps) {
  const paymentStatus = useStripePaymentStatus()

  if (paymentStatus.error) {
    return (
      <ErrorMessage error={paymentStatus.error} message='Error loading payment details' />
    )
  }

  if (paymentStatus.status === undefined) {
    return (
      <StripePaymentCardForm
        createdPaymentIntent={props.createdPaymentIntent}
        {...props.paymentCardFormProps}
      />
    )
  }

  if (paymentStatus.status === 'succeeded') {
    return props.succeededComponent || 'Payment Succeeded'
  }

  return null
}
