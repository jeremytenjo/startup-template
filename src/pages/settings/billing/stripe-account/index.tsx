import React from 'react'

import BillingStripeAccountPage from '../../../../pagesContent/Settings/Billing/pages/pages/BillingStripeAccount/pages/BillingStripeAccountPage.js'

import RootLayout from '@/src/lib/layouts/RootLayout/RootLayout.js'

export default function BillingStripeAccountPageRoot() {
  return (
    <>
      <RootLayout title='Stripe Account'>
        <BillingStripeAccountPage />
      </RootLayout>
    </>
  )
}
