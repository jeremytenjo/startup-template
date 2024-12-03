import assert from '@useweb/assert'

import paypalRestApi from '../../paypalRestApi.js'

type Payee = {
  email_address: string
  merchant_id: string
}

type Amount = {
  currency_code: 'USD'
  value: number
  breakdown?: {
    item_total?: Omit<Amount, 'breakdown'>
    shipping?: Omit<Amount, 'breakdown'>
    handling?: Omit<Amount, 'breakdown'>
    tax_total?: Omit<Amount, 'breakdown'>
    shipping_discount?: Omit<Amount, 'breakdown'>
  }
}

export type PaypalCreateOrderProps = {
  intent: 'CAPTURE'
  application_context: {
    shipping_preference: 'NO_SHIPPING' | 'SET_PROVIDED_ADDRESS' | 'GET_FROM_FILE'
  }
  purchase_units: {
    amount: Amount
    payee: Payee
    items: {
      name: string
      description: string
      quantity: number
      unit_amount: Amount
    }[]
    payment_instruction: {
      // https://developer.paypal.com/docs/multiparty/#link-partnerfees
      platform_fees: {
        amount: Amount
        payee: Payee
      }[]
    }
  }[]
}

export default async function paypalCreateOrder(props: PaypalCreateOrderProps) {
  try {
    assert<PaypalCreateOrderProps>({ props, requiredProps: ['purchase_units', 'intent'] })

    // https://developer.paypal.com/docs/api/orders/v2/#orders_create
    const paypalRestApiRes = await paypalRestApi<{
      body: PaypalCreateOrderProps
      return: {
        id: string
        status: 'CREATED' | 'SAVED' | 'APPROVED' | 'VOIDED'
        links: {
          href: string
          rel: 'self' | 'approve' | 'update' | 'delete' | 'capture' | 'refund'
          method: 'GET' | 'POST'
        }[]
      }
    }>({
      route: 'v2/checkout/orders',
      method: 'POST',
      body: props,
    })

    return paypalRestApiRes
  } catch (error) {
    throw new Error(`paypalCreateOrder`, {
      cause: {
        error: String(error),
        props,
      },
    })
  }
}

export type PaypalCreateOrderReturn = ReturnType<typeof paypalCreateOrder>
