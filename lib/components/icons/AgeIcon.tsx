import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function AgeIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='AgeIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='12'
      height='7'
      fill='none'
      viewBox='0 0 12 7'
    >
      <path
        fill='#BBBBBD'
        d='m3 6.633-3-3 3-3 .84.84-1.545 1.56h7.41L8.16 1.473 9 .633l3 3-3 3-.84-.84 1.545-1.56h-7.41l1.545 1.56-.84.84Z'
      />
    </SvgIcon>
  )
}
