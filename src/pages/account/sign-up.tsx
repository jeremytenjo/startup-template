import React from 'react'

import AccountSignUpPage from '@/src/pagesContent/Account/SignUp/pages/AccountSignUpPage.js'
import RootLayout from '@/src/lib/layouts/RootLayout/RootLayout.js'

export default function AccountSignUpPageRoot() {
  return (
    <>
      <RootLayout title='Account-Sign-Up'>
        <AccountSignUpPage />
      </RootLayout>
    </>
  )
}
