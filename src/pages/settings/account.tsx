import React from 'react'

import SettingsAccountPage from '@/src/pagesContent/Settings/Account/pages/SettingsAccountPage.js'
import RootLayout from '@/src/lib/layouts/RootLayout/RootLayout.js'

export default function SettingsAccountPageRoot() {
  return (
    <>
      <RootLayout title='Settings-Account'>
        <SettingsAccountPage />
      </RootLayout>
    </>
  )
}
