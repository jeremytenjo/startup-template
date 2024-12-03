import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function DiamondIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='DiamondIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='19'
      fill='none'
      viewBox='0 0 24 19'
    >
      <path
        fill='url(#DiamondIcon)'
        d='M4.728 0h14.254a1 1 0 0 1 .809.412l3.822 5.256a.5.5 0 0 1-.037.633l-11.354 12.3a.499.499 0 0 1-.736 0L.133 6.302a.5.5 0 0 1-.037-.633L3.919.413A1 1 0 0 1 4.728 0Z'
      />
      <defs>
        <linearGradient
          id='DiamondIcon'
          x1='4'
          x2='12'
          y1='.5'
          y2='19'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#CFE8FF' />
          <stop offset='1' stopColor='#006dba' />
        </linearGradient>
      </defs>
    </SvgIcon>
  )
}
