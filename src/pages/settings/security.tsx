import React from 'react'

import SettingsSecurityPage from '@/src/pagesContent/Settings/Security/pages/SettingsSecurityPage.js'
import RootLayout from '@/src/lib/layouts/RootLayout/RootLayout.js'

export default function SettingsSecurityPageRoot() {
  return (
    <>
      <RootLayout title='Settings-Security'>
        <SettingsSecurityPage />
      </RootLayout>
    </>
  )
}
