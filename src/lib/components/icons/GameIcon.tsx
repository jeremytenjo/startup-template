import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function GameIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        fill: 'none',
        ...(props?.sx || {}),
      }}
      data-id='GameIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='44'
      height='44'
      fill='none'
      viewBox='0 0 44 44'
    >
      <path
        stroke='#fff'
        strokeLinejoin='round'
        strokeWidth='4'
        d='M42 26H26v16h16V26ZM11 2l9 16H2l9-16Zm23 16a8 8 0 1 0 0-16.001A8 8 0 0 0 34 18Z'
      />
      <path
        stroke='#fff'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='4'
        d='m2 26 16 16m0-16L2 42'
      />
    </SvgIcon>
  )
}
