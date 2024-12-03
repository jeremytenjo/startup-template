import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function TophatIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='TophatIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='18'
      fill='none'
      viewBox='0 0 18 18'
    >
      <path
        fill='url(#TophatIconSVG)'
        d='M17.135 11.516c-.48-1.118-1.635-1.16-3.196-.936.011-2.607.45-5.096 1.285-7.817.388-.975-2.503-2.744-6.56-2.763-4.058.02-6.95 1.788-6.562 2.762.83 2.705 1.266 5.212 1.282 7.818-1.559-.223-2.713-.181-3.193.936-1.046 2.078 2.26 5.81 8.472 5.81 6.213 0 9.518-3.732 8.472-5.81ZM3.027 13.238s.392-1.37.33-2.095c3.408 3.068 7.205 3.068 10.613 0 .013.74.33 2.095.33 2.095-3.356 3.193-7.917 3.193-11.273 0Z'
      />
      <defs>
        <linearGradient
          id='TophatIconSVG'
          x1='8.663'
          x2='10.5'
          y1='0'
          y2='12'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#fff' />
          <stop offset='1' stopColor='#8d60ff' />
        </linearGradient>
      </defs>
    </SvgIcon>
  )
}
