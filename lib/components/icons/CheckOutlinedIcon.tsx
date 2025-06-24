import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function CheckOutlinedIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        fill: 'transparent',
        ...(props?.sx || {}),
      }}
      data-id='CheckOutlinedIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='11'
      height='12'
      fill='none'
      viewBox='0 0 11 12'
    >
      <rect
        width='10.45'
        height='10.45'
        x='.275'
        y='.775'
        stroke='#22FF95'
        strokeWidth='.55'
        rx='5.225'
      />
      <path
        fill='#22FF95'
        fillRule='evenodd'
        d='M8.126 4.458c.078.07.121.165.121.265s-.043.195-.12.265l-3.093 2.81a.478.478 0 0 1-.622 0L2.876 6.403a.376.376 0 0 1-.093-.121.346.346 0 0 1 .088-.414.449.449 0 0 1 .588.005l1.264 1.15 2.82-2.564a.449.449 0 0 1 .584 0Z'
        clipRule='evenodd'
      />
    </SvgIcon>
  )
}
