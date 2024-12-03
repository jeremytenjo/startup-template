import type { PartialRequired } from '@useweb/use-data'

export type PayPalOnboardingReturnUrlParamsSchema = PartialRequired<{
  merchantId: string
  merchantIdInPayPal: string
  productIntentId: string
  isEmailConfirmed: 'true' | 'false'
  accountStatus: string
  permissionsGranted: 'true' | 'false'
  consentStatus: 'true' | 'false'
  paymentsReceivable: 'true' | 'false'
  riskStatus: string
}>
