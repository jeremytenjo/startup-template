'use client'
import React from 'react'

import HomePage from './home/pages/HomePage/HomePage.js'

import RootLayout from '@/lib/layouts/RootLayout/RootLayout.js'

export default function HomePageRoot() {
  return (
    <RootLayout>
      <HomePage />
    </RootLayout>
  )
}
