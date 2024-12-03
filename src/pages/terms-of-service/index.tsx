import React from 'react'

import TermsOfServicePage from '../../pagesContent/TermsOfService/pages/TermsOfServicePage.js'

import RootLayout from '@/src/lib/layouts/RootLayout/RootLayout.js'

export default function TermsOfServicePageRoot() {
  return (
    <>
      <RootLayout title='Terms-Of-Service'>
        <TermsOfServicePage />
      </RootLayout>
    </>
  )
}
