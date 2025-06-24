import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function ModelAdIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='ModelAdIcon'
      width='18'
      height='16'
      viewBox='0 0 18 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.92699 2.15234V0.277344H17.0381V2.15234H1.92699ZM1.92699 15.2773V9.65234H0.982544V7.77734L1.92699 3.08984H17.0381L17.9825 7.77734V9.65234H17.0381V15.2773H15.1492V9.65234H11.3714V15.2773H1.92699ZM3.81588 13.4023H9.48254V9.65234H3.81588V13.4023Z'
        fill='url(#paint0_linear_1390_13554)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_1390_13554'
          x1='9.48254'
          y1='0.277344'
          x2='9.48254'
          y2='15.2773'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='white' />
          <stop offset='1' stopColor='#999999' />
        </linearGradient>
      </defs>
    </SvgIcon>
  )
}
