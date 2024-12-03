import React from 'react'

import AccountSignInPage from '@/src/pagesContent/Account/SignIn/pages/AccountSignInPage.js'
import RootLayout from '@/src/lib/layouts/RootLayout/RootLayout.js'

export default function AccountSignInPageRoot() {
  return (
    <>
      <RootLayout title='Account-Sign-In'>
        <AccountSignInPage />
      </RootLayout>
    </>
  )
}
