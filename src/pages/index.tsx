import React from 'react'

import HomePage from '@/src/pagesContent/Home/pages/HomePage.js'
import RootLayout from '@/src/lib/layouts/RootLayout/RootLayout.js'

export default function HomePageRoot() {
  return (
    <>
      <RootLayout title='Home'>
        <HomePage />
      </RootLayout>
    </>
  )
}
