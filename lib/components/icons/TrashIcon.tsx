import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

import colors from '../../../theme/tokens/colors.js'

export default function TrashIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='TrashIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='20'
      fill='none'
      viewBox='0 0 16 20'
    >
      <path
        fill={colors.neutral[250]}
        fillRule='evenodd'
        d='M1 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V8Zm4 3a1 1 0 1 1 2 0v4a1 1 0 1 1-2 0v-4Zm4 0a1 1 0 1 1 2 0v4a1 1 0 1 1-2 0v-4Z'
        clipRule='evenodd'
      />
      <path
        fill={colors.neutral[250]}
        d='M6 0a2 2 0 0 0-2 2H1a1 1 0 0 0 0 2h14a1 1 0 1 0 0-2h-3a2 2 0 0 0-2-2H6Z'
      />
    </SvgIcon>
  )
}
