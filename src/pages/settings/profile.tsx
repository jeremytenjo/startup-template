import React from 'react'

import SettingsProfilePage from '@/src/pagesContent/Settings/Profile/pages/SettingsProfilePage.js'
import RootLayout from '@/src/lib/layouts/RootLayout/RootLayout.js'

export default function SettingsProfilePageRoot() {
  return (
    <>
      <RootLayout title='Settings-Profile'>
        <SettingsProfilePage />
      </RootLayout>
    </>
  )
}
