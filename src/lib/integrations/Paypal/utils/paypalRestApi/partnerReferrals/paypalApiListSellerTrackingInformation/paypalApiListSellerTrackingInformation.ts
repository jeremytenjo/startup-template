import assert from '@useweb/assert'

import paypalRestApi from '../../paypalRestApi.js'
import { paypalConfig } from '../../../../paypal.config.js'

export type PaypalApiListSellerTrackingInformationProps = { uid: string }

export default async function paypalApiListSellerTrackingInformation(
  props: PaypalApiListSellerTrackingInformationProps,
) {
  assert<PaypalApiListSellerTrackingInformationProps>({ props, requiredProps: ['uid'] })

  const partnerId = paypalConfig.partnerId().partnerId

  // https://developer.paypal.com/docs/api/partner-referrals/v1/#merchant-integration_find
  const res = await paypalRestApi<{
    body: any
    return: MerchantData
  }>({
    route: `v1/customer/partners/${partnerId}/merchant-integrations?tracking_id=${props.uid}`,
    method: 'GET',
  })

  return res
}

export type PaypalApiListSellerTrackingInformationReturn = ReturnType<
  typeof paypalApiListSellerTrackingInformation
>

type Link = {
  href: string
  rel: string
  method: 'GET'
  description: string
}

type MerchantData = {
  merchant_id: string
  tracking_id: string
  links: Link[]
}
