import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

import colors from '../../../theme/tokens/colors.js'

export default function BigPersonIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '20px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      xmlns='http://www.w3.org/2000/svg'
      width='36'
      height='46'
      fill='none'
      viewBox='0 0 36 46'
    >
      <path
        fill={colors.semantic.warning['100']}
        d='M11.25 27.499C5.035 27.499 0 32.536 0 38.749a6.75 6.75 0 0 0 6.75 6.75h22.5a6.75 6.75 0 0 0 6.75-6.75c0-6.213-5.037-11.25-11.25-11.25h-13.5Zm6.75-27c-6.214 0-11.25 5.037-11.25 11.25s5.036 11.25 11.25 11.25c6.213 0 11.25-5.037 11.25-11.25S24.212.499 18 .499Z'
      />
    </SvgIcon>
  )
}
