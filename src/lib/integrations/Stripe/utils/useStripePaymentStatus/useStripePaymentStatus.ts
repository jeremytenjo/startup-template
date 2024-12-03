import { useStripe } from '@stripe/react-stripe-js'
import type { PaymentIntent } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'

import logError from '../../../../utils/loggers/logError/logError.js'

export default function useStripePaymentStatus() {
  const stripe = useStripe()
  const [error, setError] = useState<string | false>(false)
  const [paymentIntentRes, setPaymentIntentRes] = useState<PaymentIntent | undefined>(
    undefined,
  )
  const [paymentSent, setPaymentSent] = useState(false)

  useEffect(() => {
    if (!stripe) {
      return
    }
    setError(false)

    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret',
    )

    if (!clientSecret) {
      setPaymentSent(false)
      return
    }

    setPaymentSent(true)

    // Retrieve the PaymentIntent
    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        if (!paymentIntent) {
          setError('No PaymentIntent was found')
        }
        // Inspect the PaymentIntent `status` to indicate the status of the payment
        // to your customer.
        //
        // Some payment methods will [immediately succeed or fail][0] upon
        // confirmation, while others will first enter a `processing` state.
        //
        // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
        setPaymentIntentRes(paymentIntent)
      })
      .catch((err) => {
        logError({
          error: err,
          fnName: 'useStripePaymentStatus',
          metadata: {},
        })
        setError(err.message)
      })
  }, [stripe])

  return { ...paymentIntentRes, paymentSent, error }
}

export type UseStripePaymentStatusReturn = ReturnType<typeof useStripePaymentStatus>
