import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

import colors from '../../integrations/Useweb/theme/tokens/colors.js'

export default function PlayIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='PlayIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='34'
      height='28'
      fill='none'
      viewBox='0 0 34 28'
    >
      <path
        fill={colors.semantic.warning['100']}
        fillRule='evenodd'
        d='M30.937 1.211c-1.07-.544-2.47-.544-5.27-.544H8.333c-2.8 0-4.2 0-5.27.544A5 5 0 0 0 .879 3.397c-.545 1.07-.545 2.47-.545 5.27v10.666c0 2.8 0 4.2.545 5.27a5 5 0 0 0 2.186 2.185c1.07.545 2.47.545 5.27.545h17.333c2.8 0 4.2 0 5.27-.545a5 5 0 0 0 2.185-2.185c.545-1.07.545-2.47.545-5.27V8.667c0-2.8 0-4.2-.545-5.27a5 5 0 0 0-2.185-2.186ZM14.522 7.575C13.412 6.911 12 7.711 12 9.005v9.99c0 1.294 1.411 2.094 2.522 1.43l8.329-4.98a1.683 1.683 0 0 0 0-2.89l-8.329-4.98Z'
        clipRule='evenodd'
      />
    </SvgIcon>
  )
}
