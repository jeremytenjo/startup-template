import React from 'react'
import { createSvgIcon } from '@mui/material'

import colors from '../../../theme/tokens/colors.js'

export default createSvgIcon(
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='28'
    height='20'
    fill='none'
    viewBox='0 0 24 20'
  >
    <path
      fill={colors.neutral[150]}
      d='M26 0H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2v11a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V7a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-2 18H4V7h20v11Zm2-13H2V2h24v3Zm-16 6a1 1 0 0 1 1-1h6a1 1 0 0 1 0 2h-6a1 1 0 0 1-1-1Z'
    />
  </svg>,
  'ArchiveIcon',
)
