import React from 'react'

import PrivacyPolicyPage from '@/src/pagesContent/PrivacyPolicy/pages/PrivacyPolicyPage.js'
import RootLayout from '@/src/lib/layouts/RootLayout/RootLayout.js'

export default function PrivacyPolicyPageRoot() {
  return (
    <>
      <RootLayout title='Privacy-Policy'>
        <PrivacyPolicyPage />
      </RootLayout>
    </>
  )
}
