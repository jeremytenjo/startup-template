import React, { useState } from 'react'
import Box from '@useweb/ui/Box'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import Skeleton from '@useweb/ui/Skeleton'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import type { ButtonProps } from '@useweb/ui/Button'
import Button from '@useweb/ui/Button'
import type Stripe from 'stripe'
import type { ActionBoxProps } from '@useweb/ui/ActionBox'
import ActionBox from '@useweb/ui/ActionBox'

import useStripePaymentStatus from '../../../../utils/useStripePaymentStatus/useStripePaymentStatus.js'
import logError from '../../../../../../utils/loggers/logError/logError.js'
import StripeElementsProvider from '../../../StripeElementsProvider/StripeElementsProvider.js'

export type StripePaymentCardFormProps = {
  createdPaymentIntent: Stripe.Response<Stripe.PaymentIntent> | undefined
  submitButtonProps: Partial<ButtonProps>
  sx?: ButtonProps['sx']
  headerProps?: ActionBoxProps['headerProps']
  actionBoxCtasProps?: ActionBoxProps['actionBoxCtasProps']
  title?: string
}

export default function StripePaymentCardForm(props: StripePaymentCardFormProps) {
  return (
    <StripeElementsProvider
      clientSecret={props.createdPaymentIntent?.client_secret || undefined}
    >
      <StripePaymentCardFormChildren {...props} />
    </StripeElementsProvider>
  )
}

function StripePaymentCardFormChildren(props: StripePaymentCardFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const paymentStatus = useStripePaymentStatus()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [paying, setPaying] = useState(false)
  const [paymentElementLoaded, setPaymentElementLoaded] = useState(false)

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()
    setPaying(true)

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${location.origin}/${location.pathname}`,
      },
    })

    if (error?.message) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message as any)
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }

    setPaying(false)
  }

  return !paymentStatus.paymentSent ? (
    <Box data-id='StripePaymentCardForm' component={'form'} onSubmit={handleSubmit}>
      <ActionBox
        data-id='StripePaymentCardForm'
        headerProps={props.headerProps}
        title={props.title}
        singleCTA
        ctas={
          paymentElementLoaded ? (
            <Button
              data-id='StripePaymentCardFormButton'
              name='Pay'
              disabled={!stripe || props.submitButtonProps?.disabled}
              loading={paying || props.submitButtonProps?.loading}
              onClick={() => {}}
              type='submit'
              sx={{
                textTransform: 'uppercase',
                ...(props.submitButtonProps?.sx || {}),
              }}
            >
              {props.submitButtonProps?.children || 'Pay'}
            </Button>
          ) : null
        }
        sx={{
          ...props.sx,
        }}
        actionBoxCtasProps={props.actionBoxCtasProps}
        childrenSx={{
          display: 'grid',
          gap: 2,
        }}
      >
        {!paymentElementLoaded && !errorMessage && (
          <Skeleton loading count={4}>
            skeleton
          </Skeleton>
        )}
        <PaymentElement
          onLoadError={(error) => {
            setErrorMessage('Error loading payment form. Please try again later.')

            logError({
              fnName: 'StripePaymentCardForm - PaymentElement - onLoadError',
              error: String(error.error?.message),
              metadata: {
                error,
              },
            })
          }}
          onReady={() => {
            setPaymentElementLoaded(true)
          }}
        />
        <ErrorMessage error={errorMessage} message={errorMessage} />
      </ActionBox>
    </Box>
  ) : null
}
