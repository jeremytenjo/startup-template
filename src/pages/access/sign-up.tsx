import React from 'react'

import AccessSignUpPage from '@/src/pagesContent/Access/SignUp/pages/AccessSignUpPage.js'
import RootLayout from '@/src/lib/layouts/RootLayout/RootLayout.js'

export default function AccessSignUpPageRoot() {
  return (
    <>
      <RootLayout title='Access-Sign-Up'>
        <AccessSignUpPage />
      </RootLayout>
    </>
  )
}
