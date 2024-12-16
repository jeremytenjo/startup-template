import React from 'react'
import Palette from '@useweb/ui/DesignSystemPalette'

import colors from '../colors.js'

export default function ColorsStories() {
  return (
    <Palette
      colors={colors}
      sx={{
        '& span': {
          color: 'white',
        },
      }}
    />
  )
}
