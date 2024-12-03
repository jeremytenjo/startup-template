import React from 'react'

import SettingsBillingPage from '@/src/pagesContent/Settings/Billing/pages/SettingsBillingPage.js'
import RootLayout from '@/src/lib/layouts/RootLayout/RootLayout.js'

export default function SettingsBillingPageRoot() {
  return (
    <>
      <RootLayout title='Settings-Billing'>
        <SettingsBillingPage />
      </RootLayout>
    </>
  )
}
