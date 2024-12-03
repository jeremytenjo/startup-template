import React from 'react'

import FaqPage from '@/src/pagesContent/Faq/pages/FaqPage.js'
import RootLayout from '@/src/lib/layouts/RootLayout/RootLayout.js'

export default function FaqPageRoot() {
  return (
    <>
      <RootLayout title='Faq'>
        <FaqPage />
      </RootLayout>
    </>
  )
}
