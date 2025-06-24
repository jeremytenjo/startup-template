'use client'
import React from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'

import UiTheme from './UiTheme/UiTheme.js'

export default function Theme({ children }) {
  return (
    <AppRouterCacheProvider>
      <UiTheme>{children}</UiTheme>
    </AppRouterCacheProvider>
  )
}

export const ThemeWithoutCacheProvider = ({ children }) => {
  return <UiTheme>{children}</UiTheme>
}
