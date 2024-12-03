import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { getStripePublishableKey } from '../../utils/stripe.utils.config.js'
import colors from '../../../../../theme/tokens/colors.js'

const stripePromise = loadStripe(getStripePublishableKey().stripePublishableKey)

export type StripeElementsProviderProps = {
  clientSecret: string | undefined
  children: React.ReactNode
}

export default function StripeElementsProvider(props: StripeElementsProviderProps) {
  return props.clientSecret ? (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: props.clientSecret,
        // https://stripe.com/docs/elements/appearance-api
        appearance: {
          theme: 'night',
          variables: {
            colorDanger: colors.semantic.error[200],
          },
          rules: {
            '.Label': {
              color: colors.neutral[100],
              marginBottom: '8px',
              fontSize: '12px',
              fontWeight: '500',
            },
            '.Input': {
              backgroundColor: colors.neutral[300],
              border: `1px solid ${colors.neutral[300]}`,
              boxShadow: 'none',
              borderRadius: '14px',
            },
            '.Input::placeholder': {
              color: colors.neutral[200],
              fontSize: '14px',
            },
          },
        },
      }}
    >
      {props.children}
    </Elements>
  ) : null
}
