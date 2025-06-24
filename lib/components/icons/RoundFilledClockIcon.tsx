import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function RoundFilledClockIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='RoundFilledClockIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='10'
      height='10'
      fill='none'
      viewBox='0 0 10 10'
    >
      <path
        fill='#B6C1D1'
        d='M5 0a5 5 0 1 0 0 10A5 5 0 0 0 5 0Zm2.1 7.1L4.5 5.5v-3h.75v2.6L7.5 6.45l-.4.65Z'
      />
    </SvgIcon>
  )
}
