import React from 'react'

import './storybookTheme.css'
import Theme from '../../../lib/integrations/Useweb/theme/theme.jsx'

export default function StorybookTheme({ children }) {
  return <Theme>{children}</Theme>
}
