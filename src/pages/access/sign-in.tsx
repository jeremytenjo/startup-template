import React from 'react'

import AccessSignInPage from '@/src/pagesContent/Access/SignIn/pages/AccessSignInPage.js'
import RootLayout from '@/src/lib/layouts/RootLayout/RootLayout.js'

export default function AccessSignInPageRoot() {
  return (
    <>
      <RootLayout title='Access-Sign-In'>
        <AccessSignInPage />
      </RootLayout>
    </>
  )
}
