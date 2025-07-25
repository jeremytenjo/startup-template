import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function WhiteCalendarIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        fill: 'none',
        ...(props?.sx || {}),
      }}
      data-id='WhiteCalendarIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='17'
      fill='none'
      viewBox='0 0 18 17'
    >
      <path
        stroke='#fff'
        strokeWidth='1.5'
        d='M1.5 8.302c0-2.9 0-4.351.879-5.252.878-.902 2.293-.902 5.121-.902h3c2.828 0 4.243 0 5.121.902.879.9.879 2.352.879 5.252v1.539c0 2.9 0 4.351-.879 5.252-.878.902-2.293.902-5.121.902h-3c-2.828 0-4.243 0-5.121-.902-.879-.9-.879-2.351-.879-5.252V8.302Z'
      />
      <path
        stroke='#fff'
        strokeLinecap='round'
        strokeWidth='1.5'
        d='M5.246 2.154V1m7.5 1.154V1M1.871 6h14.25'
      />
      <path
        fill='#fff'
        d='M13.5 12.147a.78.78 0 0 1-.22.544.74.74 0 0 1-1.06 0 .78.78 0 0 1 0-1.088.74.74 0 0 1 1.06 0c.141.144.22.34.22.544Zm0-3.077a.78.78 0 0 1-.22.544.74.74 0 0 1-1.06 0 .78.78 0 0 1 0-1.088.74.74 0 0 1 1.06 0c.141.144.22.34.22.544Zm-3.75 3.077a.78.78 0 0 1-.22.544.74.74 0 0 1-1.06 0 .78.78 0 0 1 0-1.088.74.74 0 0 1 1.06 0c.141.144.22.34.22.544Zm0-3.077a.78.78 0 0 1-.22.544.74.74 0 0 1-1.06 0 .78.78 0 0 1 0-1.088.74.74 0 0 1 1.06 0c.141.144.22.34.22.544ZM6 12.147a.78.78 0 0 1-.22.544.74.74 0 0 1-1.06 0 .78.78 0 0 1 0-1.088.74.74 0 0 1 1.06 0c.141.144.22.34.22.544ZM6 9.07a.78.78 0 0 1-.22.544.74.74 0 0 1-1.06 0 .78.78 0 0 1 0-1.088.74.74 0 0 1 1.06 0c.141.144.22.34.22.544Z'
      />
    </SvgIcon>
  )
}
