import React from 'react'

import AccountResetPasswordPage from '@/src/pagesContent/Account/ResetPassword/pages/AccountResetPasswordPage.js'
import RootLayout from '@/src/lib/layouts/RootLayout/RootLayout.js'

export default function AccountResetPasswordPageRoot() {
  return (
    <>
      <RootLayout title='Account-Reset-Password'>
        <AccountResetPasswordPage />
      </RootLayout>
    </>
  )
}
