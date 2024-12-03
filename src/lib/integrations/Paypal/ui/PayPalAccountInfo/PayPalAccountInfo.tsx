import React from 'react'
import Alert from '@useweb/ui/Alert'
import ActionBox from '@useweb/ui/ActionBox'

export type PayPalAccountInfoProps = { name?: string }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PayPalAccountInfo(props: PayPalAccountInfoProps) {
  return (
    <ActionBox
      data-id='PayPalAccountInfo'
      headerProps={{
        title: 'Account Info',
      }}
      sx={{}}
    >
      <Alert severity='success'>PayPal Account Connected</Alert>
    </ActionBox>
  )
}
