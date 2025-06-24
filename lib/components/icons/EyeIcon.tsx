import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

import colors from '../../../theme/tokens/colors.js'

export default function EyeIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '50px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      xmlns='http://www.w3.org/2000/svg'
      width='28'
      height='22'
      fill='none'
      viewBox='0 0 28 22'
    >
      <path
        fill={colors.semantic.warning[100]}
        fillRule='evenodd'
        d='M1.027 9.32C2.186 6.715 5.855.332 14 .332S25.815 6.717 26.974 9.32a4.118 4.118 0 0 1 0 3.36c-1.16 2.603-4.829 8.986-12.974 8.986S2.186 15.283 1.027 12.68a4.117 4.117 0 0 1 0-3.36ZM14 16.332a5.333 5.333 0 1 0 0-10.667 5.333 5.333 0 0 0 0 10.667Z'
        clipRule='evenodd'
      />
    </SvgIcon>
  )
}
