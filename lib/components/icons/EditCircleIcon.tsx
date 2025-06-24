import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

import colors from '../../../theme/tokens/colors.js'

export default function EditCircleIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='EditCircleIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='52'
      height='52'
      fill='none'
      viewBox='0 0 52 52'
    >
      <rect width='52' height='52' fill={colors.neutral['200']} rx='26' />
      <path
        fill={colors.neutral['600']}
        d='M16.998 31.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15l10.92-10.91-3.75-3.75-10.91 10.91c-.1.1-.15.22-.15.36Zm17.71-10.42a.996.996 0 0 0 0-1.41l-2.34-2.34a.995.995 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z'
      />
    </SvgIcon>
  )
}
