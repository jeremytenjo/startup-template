import React from 'react'

import ProfilePage from '../../pagesContent/Profile/pages/ProfilePage.js'

import RootLayout from '@/src/lib/layouts/RootLayout/RootLayout.js'

export default function ProfilePageRoot() {
  return (
    <>
      <RootLayout
        title='Profile'
        authRequiredMessage='You must be signed in to view your profile'
      >
        <ProfilePage />
      </RootLayout>
    </>
  )
}
