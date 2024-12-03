import assert from '@useweb/assert'

import paypalRestApi from '../../paypalRestApi.js'
import { paypalConfig } from '../../../../paypal.config.js'

export type PaypalShowSellerStatusProps = { merchantId: string }

export default async function paypalShowSellerStatus(props: PaypalShowSellerStatusProps) {
  assert<PaypalShowSellerStatusProps>({ props, requiredProps: ['merchantId'] })

  const partnerId = paypalConfig.partnerId().partnerId

  // https://developer.paypal.com/docs/api/partner-referrals/v1/#merchant-integration_status
  const res = await paypalRestApi<{
    body: any
    return: PaypalShowSellerStatusResponse
  }>({
    route: `v1/customer/partners/${partnerId}/merchant-integrations/${props.merchantId}`,
    method: 'GET',
  })

  return res
}

export type PaypalShowSellerStatusReturn = ReturnType<typeof paypalShowSellerStatus>

type PaypalProduct = {
  name: string
  status?: string
  vetting_status?: string
  capabilities?: string[]
}

type PaypalCapability = {
  name: string
  status: string
}

type PaypalOAuthIntegration = {
  integration_type: string
  oauth_third_party: {
    partner_client_id: string
    merchant_client_id: string
    scopes: string[]
  }[]
}

type PaypalShowSellerStatusResponse = {
  merchant_id: string
  products: PaypalProduct[]
  capabilities: PaypalCapability[]
  payments_receivable: boolean
  legal_name: string
  primary_email: string
  primary_email_confirmed: boolean
  oauth_integrations: PaypalOAuthIntegration[]
}
