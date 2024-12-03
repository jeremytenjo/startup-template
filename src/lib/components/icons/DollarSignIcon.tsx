import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function DollarSignIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='DollarSignIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='9'
      height='15'
      fill='none'
      viewBox='0 0 9 15'
    >
      <path
        fill='url(#a)'
        d='M0 10h1.667c0 .9 1.141 1.667 2.5 1.667 1.358 0 2.5-.767 2.5-1.667 0-.917-.867-1.25-2.7-1.692C2.2 7.867 0 7.317 0 5c0-1.492 1.225-2.758 2.917-3.183V0h2.5v1.817C7.108 2.242 8.333 3.508 8.333 5H6.667c0-.9-1.142-1.667-2.5-1.667-1.359 0-2.5.767-2.5 1.667 0 .917.866 1.25 2.7 1.692 1.766.441 3.966.991 3.966 3.308 0 1.492-1.225 2.758-2.916 3.183V15h-2.5v-1.817C1.225 12.758 0 11.492 0 10Z'
      />
      <defs>
        <linearGradient
          id='a'
          x1='4.167'
          x2='4.167'
          y1='0'
          y2='15'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#fff' />
          <stop offset='1' stopColor='#999' />
        </linearGradient>
      </defs>
    </SvgIcon>
  )
}
