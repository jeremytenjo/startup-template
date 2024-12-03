import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

import colors from '../../../theme/tokens/colors.js'

export default function GoldCheckIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='GoldCheckIcon'
      width='20'
      height='16'
      viewBox='0 0 20 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M19.2692 1.23311C20.2453 2.2093 20.2453 3.792 19.2692 4.76819L9.27047 14.7669C8.29428 15.7431 6.71158 15.7431 5.73539 14.7669L0.736044 9.76754C-0.24014 8.79135 -0.24014 7.20865 0.736044 6.23246C1.71223 5.25628 3.29493 5.25628 4.27112 6.23246L7.50293 9.46427L15.7341 1.23311C16.7103 0.256931 18.293 0.256931 19.2692 1.23311Z'
        fill={colors.semantic.warning['100']}
      />
    </SvgIcon>
  )
}
