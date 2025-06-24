import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

import colors from '../../integrations/Useweb/theme/tokens/colors.js'

export default function StarEyesFaceIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='StarEyesFaceIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='34'
      height='34'
      fill='none'
      viewBox='0 0 34 34'
    >
      <path
        fill={colors.semantic.warning['100']}
        d='M16.998.333C7.793.333.33 7.795.33 17c0 9.203 7.462 16.666 16.667 16.666 9.205 0 16.666-7.463 16.666-16.666C33.663 7.795 26.2.333 16.997.333Zm0 29.198a12.656 12.656 0 0 1-10-4.928l2.598-2.597a9.026 9.026 0 0 0 7.402 3.909A9.017 9.017 0 0 0 24.403 22l2.595 2.596a12.633 12.633 0 0 1-10 4.935Zm8.485-15.713-1.819 4.848-1.818-4.848L16.998 12l-4.849 1.818-1.818 4.848-1.818-4.848L3.664 12l4.849-1.819 1.818-4.848 1.818 4.848L16.998 12l4.848-1.819 1.818-4.848 1.819 4.848L30.33 12l-4.848 1.818Z'
      />
    </SvgIcon>
  )
}
