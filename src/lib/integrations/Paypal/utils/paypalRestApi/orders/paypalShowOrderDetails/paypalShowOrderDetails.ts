import assert from '@useweb/assert'

import paypalRestApi from '../../paypalRestApi.js'

export type PaypalShowOrderDetailsProps = { orderId: string }

export default async function paypalShowOrderDetails(props: PaypalShowOrderDetailsProps) {
  assert<PaypalShowOrderDetailsProps>({ props, requiredProps: ['orderId'] })

  // https://developer.paypal.com/docs/api/orders/v2/#orders_get
  const order = await paypalRestApi<{
    body: any
    return: PayPalOrderResponse
  }>({
    route: `v2/checkout/orders/${props.orderId}`,
    method: 'GET',
  })

  return { order }
}

export type PaypalShowOrderDetailsReturn = ReturnType<typeof paypalShowOrderDetails>

type Name = {
  given_name: string
  surname: string
}

type PaypalPaymentSource = {
  paypal: {
    name: Name
    email_address: string
    account_id: string
  }
}

type Amount = {
  currency_code: 'USD'
  value: string
}

type PurchaseUnit = {
  reference_id: string
  amount: Amount
}

type Payer = {
  name: Name
  email_address: string
  payer_id: string
}

type Link = {
  href: string
  rel: 'self' | 'approve' | 'update' | 'capture'
  method: 'GET' | 'POST' | 'PATCH'
}

type PayPalOrderResponse = {
  id: string
  status: 'APPROVED'
  intent: 'CAPTURE'
  payment_source: PaypalPaymentSource
  purchase_units: PurchaseUnit[]
  payer: Payer
  create_time: string
  links: Link[]
}
