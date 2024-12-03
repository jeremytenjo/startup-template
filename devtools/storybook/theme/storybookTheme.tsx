import React from 'react'

import './storybookTheme.css'
import AppTheme from '../../../src/theme/theme.js'

export default function StorybookTheme({ children }) {
  return <AppTheme>{children}</AppTheme>
}
