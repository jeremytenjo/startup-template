import React from 'react'
import { createSvgIcon } from '@mui/material'

export default createSvgIcon(
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 9 9'>
    <path
      stroke='url(#ArrowNegativeIcon)'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M4.5 1v7m0 0L8 4.5M4.5 8 1 4.5'
    />
    <defs>
      <linearGradient
        id='ArrowNegativeIcon'
        x1={4.5}
        x2={4.5}
        y1={8}
        y2={1}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='red' />
        <stop offset={1} stopColor='#D50202' />
      </linearGradient>
    </defs>
  </svg>,
  'ArrowNegativeIcon',
)
