import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function RoundPlayIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='RoundPlayIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='none'
      viewBox='0 0 16 16'
    >
      <path
        fill='#fff'
        fillRule='evenodd'
        d='M8 15.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15ZM6.885 5.109a.75.75 0 0 0-1.135.644v4.495a.75.75 0 0 0 1.135.643l3.748-2.24a.758.758 0 0 0 0-1.301L6.885 5.109Z'
        clipRule='evenodd'
      />
    </SvgIcon>
  )
}
