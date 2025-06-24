import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function GenderIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='GenderIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='14'
      height='15'
      fill='none'
      viewBox='0 0 14 15'
    >
      <path
        fill='none'
        stroke='#BBBBBD'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M13 1.633 8.371 6.26M13 1.633H8.714m4.286 0v4.286M1 9.347a4.286 4.286 0 1 0 8.572 0 4.286 4.286 0 0 0-8.572 0Z'
      />
    </SvgIcon>
  )
}
