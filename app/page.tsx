import React from 'react'

import HomePage from '@/pagesContent/Home/pages/HomePage.js'
import RootLayout from '@/lib/layouts/RootLayout/RootLayout.js'

export default function HomePageRoot() {
  return (
    <RootLayout>
      <HomePage />
    </RootLayout>
  )
}
