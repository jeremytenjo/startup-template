'use client'
import React from 'react'
import Box from '@useweb/ui/Box'

import HomePageLayout from './HomePage.layout.js'

export default function HomePage() {
  return (
    <HomePageLayout>
      <Box data-id='HomePage' sx={{}}>
        Home
      </Box>
    </HomePageLayout>
  )
}
