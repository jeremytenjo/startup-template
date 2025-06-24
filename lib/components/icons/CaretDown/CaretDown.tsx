import React from 'react'
import { createSvgIcon } from '@mui/material'

import colors from '../../../../theme/tokens/colors.js'

export default createSvgIcon(
  <svg viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M1.33984 0.75L5.83984 5.25L10.3398 0.75'
      stroke={colors.neutral[200]}
      strokeWidth='1.125'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>,
  'CaretDown',
)
