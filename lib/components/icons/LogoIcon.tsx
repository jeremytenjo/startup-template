import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function LogoIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='LogoIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='192'
      height='192'
      fill='none'
      viewBox='0 0 192 192'
    >
      <path
        fill='#A53CEB'
        d='M0 96C0 42.98 42.98 0 96 0c53.019 0 96 42.98 96 96 0 53.019-42.981 96-96 96-53.02 0-96-42.981-96-96Z'
      />
    </SvgIcon>
  )
}
