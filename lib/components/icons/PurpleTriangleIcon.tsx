import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function PurpleTriangleIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='PurpleTriangleIcon'
      width='1059'
      height='769'
      viewBox='0 0 1059 769'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M1059 0L544 395.029L0 769H1059V0Z' fill='url(#paint0_linear_420_11087)' />
      <defs>
        <linearGradient
          id='paint0_linear_420_11087'
          x1='1059'
          y1='769'
          x2='662'
          y2='300.5'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#783696' />
          <stop offset='0.826557' stopColor='#1D1848' />
          <stop offset='1' stopColor='#141925' stopOpacity='0' />
        </linearGradient>
      </defs>
    </SvgIcon>
  )
}
