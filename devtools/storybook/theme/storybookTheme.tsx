import React from 'react'

import './storybookTheme.css'
import Theme from '../../../theme/theme.js'

export default function StorybookTheme({ children }) {
  return <Theme>{children}</Theme>
}
