import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'

import colors from '../../tokens/colors.js'
import { themeTokens } from '../../tokens/tokens.js'

// styles
export const islandStyles: BoxProps['sx'] = {
  height: 'fit-content',
  width: '100%',
  borderRadius: themeTokens.borderRadius[1],
  backgroundColor: colors.neutral[400],
  border: `1px solid ${colors.neutral[300]}`,
  p: '15px',
  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
}

// components
export const Island = (props: BoxProps) => {
  return (
    <Box {...props} sx={{ ...islandStyles, ...(props.sx || {}) }}>
      {props.children}
    </Box>
  )
}
