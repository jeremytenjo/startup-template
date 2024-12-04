import React from 'react'

import SettingsEditProfilePage from '../../pagesContent/Settings/EditProfile/pages/SettingsEditProfilePage.js'

import RootLayout from '@/src/lib/layouts/RootLayout/RootLayout.js'

export default function SettingsEditProfilePageRoot() {
  return (
    <>
      <RootLayout title='Settings-Profile'>
        <SettingsEditProfilePage />
      </RootLayout>
    </>
  )
}
