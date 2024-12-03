import React from 'react'
import Link from '@useweb/ui/Link'
import Button from '@useweb/ui/Button'

export type PayPalSettingsLinkProps = { label?: string }

export default function PayPalSettingsLink(props: PayPalSettingsLinkProps) {
  return (
    <Link data-id='PayPalSettingsLink' href={`/settings/billing/paypal-account`}>
      <Button name='PayPalSettingsLink' sx={{}}>
        {props.label || 'PayPal Settings'}
      </Button>
    </Link>
  )
}
