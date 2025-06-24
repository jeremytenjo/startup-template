import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function PlusRoundIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='PlusRoundIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='31'
      height='30'
      fill='none'
      viewBox='0 0 31 30'
    >
      <path
        stroke='#000'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2.207'
        d='M9.714 15h11.572M15.5 9.429V20.57M29 15c0 7.18-6.044 13-13.5 13S2 22.18 2 15 8.044 2 15.5 2 29 7.82 29 15Z'
      />
    </SvgIcon>
  )
}
