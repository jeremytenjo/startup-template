import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

import colors from '../../integrations/Useweb/theme/tokens/colors.js'

export default function HeartIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='HeartIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='29'
      height='28'
      fill='none'
      viewBox='0 0 29 28'
    >
      <path
        fill={colors.semantic.warning['100']}
        d='m14.5 27.108-2.102-1.915C4.93 18.422 0 13.941 0 8.476 0 3.995 3.509.5 7.975.5c2.523 0 4.944 1.175 6.525 3.016C16.08 1.675 18.502.5 21.025.5 25.491.5 29 3.994 29 8.475c0 5.466-4.93 9.947-12.398 16.718L14.5 27.108Z'
      />
    </SvgIcon>
  )
}
