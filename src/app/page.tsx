import React from 'react'

import HomePage from '@/src/pagesContent/Home/pages/HomePage.js'
import RootLayout from '@/lib/layouts/RootLayout/RootLayout.js'

export default function Home() {
  return (
    <RootLayout>
      <HomePage />
    </RootLayout>
  )
}
