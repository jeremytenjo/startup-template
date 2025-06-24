import React from 'react'
import { createSvgIcon } from '@mui/material'

export default createSvgIcon(
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 10'>
    <path
      stroke='url(#ArrowPositiveIcon)'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M5 8.5v-7m0 0L1.5 5M5 1.5 8.5 5'
    />
    <defs>
      <linearGradient
        id='ArrowPositiveIcon'
        x1={5}
        x2={5}
        y1={1.5}
        y2={8.5}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#00FF19' />
        <stop offset={1} stopColor='#04BB00' />
      </linearGradient>
    </defs>
  </svg>,
  'ArrowPositiveIcon',
)
