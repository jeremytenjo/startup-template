import React from 'react'

import './storybookTheme.css'
import { ThemeWithoutCacheProvider } from '../../Useweb/theme/theme.js'

export default function StorybookTheme({ children }) {
  return <ThemeWithoutCacheProvider>{children}</ThemeWithoutCacheProvider>
}
