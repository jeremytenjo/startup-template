import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function CheckIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='CheckIcon'
      width='14'
      height='11'
      viewBox='0 0 14 11'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13 1.5 4.75 9.75 1 6'
        stroke='white'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.125'
      />
    </SvgIcon>
  )
}
