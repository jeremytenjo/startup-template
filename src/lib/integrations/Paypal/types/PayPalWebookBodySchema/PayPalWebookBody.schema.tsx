export type PayPalWebookBodySchema = {
  create_time: string
  event_type: 'MERCHANT.ONBOARDING.COMPLETED'
  event_version: string
  id: string
  links: Array<{
    href: string
    method: string
    rel: string
  }>
  resource: {
    links: Array<{
      description: string
      href: string
      method: string
      rel: string
    }>
    merchant_id: string
    partner_client_id: string
    tracking_id: string
  }
  resource_type: 'merchant-onboarding'
  summary: string
}
