import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

import colors from '../../integrations/Useweb/theme/tokens/colors.js'

export default function ChromosomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='ChromosomeIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='34'
      height='28'
      fill='none'
      viewBox='0 0 34 28'
    >
      <path
        fill={colors.semantic.warning['100']}
        fillRule='evenodd'
        d='M28.666 10.666a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM12 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM5.333 27.333a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM27 19a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z'
        clipRule='evenodd'
      />
    </SvgIcon>
  )
}
