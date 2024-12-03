import React from 'react'
import type Stripe from 'stripe'
import type { AlertProps } from '@useweb/ui/Alert'
import Alert from '@useweb/ui/Alert'

import centsToDollars from '../../../../utils/currency/centsToDollars/centsToDollars.js'

export type CantDeleteStripeAccountAlertProps = {
  availableBalanceCents: Stripe.Balance.Available | undefined
  pendingBalanceCents: Stripe.Balance.Pending | undefined
  sx?: AlertProps['sx']
}

export default function CantDeleteStripeAccountAlert(
  props: CantDeleteStripeAccountAlertProps,
) {
  return (
    <Alert
      data-id='CantDeleteStripeAccountAlert'
      severity='warning'
      sx={{
        ...(props.sx || {}),
      }}
    >
      You have a balance of $
      {
        centsToDollars({
          cents: props.availableBalanceCents?.amount || 0,
        }).human
      }{' '}
      {props.availableBalanceCents?.currency} available and $
      {
        centsToDollars({
          cents: props.pendingBalanceCents?.amount || 0,
        }).human
      }{' '}
      {props.pendingBalanceCents?.currency} pending. You must withdraw your balance before
      you can delete your account.
    </Alert>
  )
}
