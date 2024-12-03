import assert from '@useweb/assert'

import paypalRestApi from '../../paypalRestApi.js'
import { paypalConfig } from '../../../../paypal.config.js'

export type PaypalRestApiShowSellerStatusProps = { merchantId: string }

export default async function paypalRestApiShowSellerStatus(
  props: PaypalRestApiShowSellerStatusProps,
) {
  assert<PaypalRestApiShowSellerStatusProps>({ props, requiredProps: ['merchantId'] })

  const parterId = paypalConfig.partnerId().partnerId

  // https://developer.paypal.com/docs/api/partner-referrals/v1/#merchant-integration_status
  const res = await paypalRestApi<{
    body: any
    return: MerchantDetails
  }>({
    route: `v1/customer/partners/${parterId}/merchant-integrations/${props.merchantId}`,
    method: 'GET',
  })

  const resError = res as any as {
    debug_id: string
    message: string
    name: string
  }

  if (resError?.message) {
    throw new Error(resError.message, { cause: { resError } })
  }

  return res
}

export type PaypalRestApiShowSellerStatusReturn = ReturnType<
  typeof paypalRestApiShowSellerStatus
>

type Product = {
  name: string
  status?: 'ACTIVE' | 'IN_REVIEW'
  vetting_status?: 'SUBSCRIBED' | 'IN_REVIEW'
  capabilities?: string[]
}

type Capability = {
  name: string
  status: 'ACTIVE' | 'IN_REVIEW'
}

type OAuthThirdParty = {
  partner_client_id: string
  merchant_client_id: string
  scopes: string[]
}

type OAuthIntegration = {
  integration_type: 'OAUTH_THIRD_PARTY'
  oauth_third_party: OAuthThirdParty[]
}

type MerchantDetails = {
  merchant_id: string
  products: Product[]
  capabilities: Capability[]
  payments_receivable: boolean
  legal_name: string
  primary_email: string
  primary_email_confirmed: boolean
  oauth_integrations: OAuthIntegration[]
}
