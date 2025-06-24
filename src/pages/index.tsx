import React from 'react'

import appConfig from '../../app.config.js'

import HomePage from '@/src/pagesContent/Home/pages/HomePage.js'
import RootLayout from '@/lib/layouts/RootLayout/RootLayout.js'

export default function HomePageRoot() {
  return (
    <>
      <RootLayout title={appConfig.siteInfo.name}>
        <HomePage />
      </RootLayout>
    </>
  )
}
