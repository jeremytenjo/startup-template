import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

import colors from '../../integrations/Useweb/theme/tokens/colors.js'

export default function FilterIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '20px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      xmlns='http://www.w3.org/2000/svg'
      width='30'
      height='17'
      fill='none'
      viewBox='0 0 30 17'
    >
      <path fill={colors.neutral[100]} d='M0 0h30v3H0V0Zm5 7h20v3H5V7Zm6 7h8v3h-8v-3Z' />
    </SvgIcon>
  )
}
