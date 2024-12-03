import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function GreenTriangleIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='GreenTriangleIcon'
      width='1059'
      height='769'
      viewBox='0 0 1059 769'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M0 0L515 395.029L1059 769H0V0Z' fill='url(#paint0_linear_415_11084)' />
      <defs>
        <linearGradient
          id='paint0_linear_415_11084'
          x1='-8.58786e-06'
          y1='769'
          x2='430'
          y2='350.5'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#507238' />
          <stop offset='0.826557' stopColor='#0E2827' />
          <stop offset='1' stopColor='#0E2827' stopOpacity='0' />
        </linearGradient>
      </defs>
    </SvgIcon>
  )
}
