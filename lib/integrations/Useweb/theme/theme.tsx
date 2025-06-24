'use client'
import React from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'

import UiTheme from './UiTheme/UiTheme.jsx'

export default function Theme({ children }) {
  return (
    <AppRouterCacheProvider>
      <UiTheme>{children}</UiTheme>
    </AppRouterCacheProvider>
  )
}
