import React from 'react'

import AccessResetPasswordPage from '@/src/pagesContent/Access/ResetPassword/pages/AccessResetPasswordPage.js'
import RootLayout from '@/src/lib/layouts/RootLayout/RootLayout.js'

export default function AccessResetPasswordPageRoot() {
  return (
    <>
      <RootLayout title='Access-Reset-Password'>
        <AccessResetPasswordPage />
      </RootLayout>
    </>
  )
}
