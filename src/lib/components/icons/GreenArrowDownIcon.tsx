import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function GreenArrowDownIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='GreenArrowDownIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='13'
      height='11'
      fill='none'
      viewBox='0 0 13 11'
    >
      <path
        fill='url(#a)'
        d='M7.366 10.5a1 1 0 0 1-1.732 0l-5.196-9A1 1 0 0 1 1.304 0h10.392a1 1 0 0 1 .866 1.5l-5.196 9Z'
      />
      <defs>
        <linearGradient
          id='a'
          x1='6.5'
          x2='6.5'
          y1='-4'
          y2='12'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#00AA6D' />
          <stop offset='1' stopColor='#00FFA3' />
        </linearGradient>
      </defs>
    </SvgIcon>
  )
}
