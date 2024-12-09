import React from 'react'

import BillingTransactionsPage from '../../../pagesContent/Settings/Billing/pages/BillingTransactionsPage.js'

import RootLayout from '@/src/lib/layouts/RootLayout/RootLayout.js'

export default function SettingsBillingPageRoot() {
  return (
    <>
      <RootLayout title='Transactions'>
        <BillingTransactionsPage />
      </RootLayout>
    </>
  )
}
