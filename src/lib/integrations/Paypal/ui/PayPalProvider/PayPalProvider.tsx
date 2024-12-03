import React from 'react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

import { paypalConfig } from '../../paypal.config.js'

export type PayPalProviderProps = { children: any }

// https://github.com/paypal/paypal-js/blob/main/packages/react-paypal-js/README.md
export default function PayPalProvider(props: PayPalProviderProps) {
  const clientId = React.useMemo(() => {
    return paypalConfig.clientId({ isBrowser: true }).clientId
  }, [])

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        disableFunding: 'paylater',
        environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
      }}
    >
      {props.children}
    </PayPalScriptProvider>
  )
}
