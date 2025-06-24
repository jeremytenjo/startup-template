import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

import colors from '../../../theme/tokens/colors.js'

export default function PiggyIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='PiggyIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='18'
      fill='none'
      viewBox='0 0 20 18'
    >
      <path
        fill={colors.neutral[200]}
        fillRule='evenodd'
        d='M9.5 0a4.502 4.502 0 0 1 4.336 3.292l.052.205 1.87-.467a1 1 0 0 1 1.233.84L17 4v1.81a6.516 6.516 0 0 1 1.364 1.882l.138.308H19a1 1 0 0 1 .993.883L20 9v3a1 1 0 0 1-.445.832l-.108.062-1.168.585a6.525 6.525 0 0 1-2.02 2.325l-.259.174V17a1 1 0 0 1-.883.993L15 18h-3a1 1 0 0 1-.993-.883L11 17h-1a1 1 0 0 1-.883.993L9 18H6a1 1 0 0 1-.993-.883L5 17v-1.022a6.508 6.508 0 0 1-2.854-4.101 3.002 3.002 0 0 1-2.14-2.693L0 9v-.5a1 1 0 0 1 1.993-.117L2 8.5V9c0 .148.032.289.09.415a6.504 6.504 0 0 1 2.938-4.411A4.5 4.5 0 0 1 9.5 0ZM14 8a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM9.5 2a2.5 2.5 0 0 0-2.478 2.169A6.52 6.52 0 0 1 8.5 4h3.377l.07-.017A2.5 2.5 0 0 0 9.5 2Z'
        clipRule='evenodd'
      />
    </SvgIcon>
  )
}
