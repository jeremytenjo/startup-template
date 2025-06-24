import React from 'react'

import './storybookTheme.css'
import Theme from '../../Useweb/theme/theme.js'

export default function StorybookTheme({ children }) {
  return <Theme>{children}</Theme>
}
