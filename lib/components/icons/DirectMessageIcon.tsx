import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function DirectMessageIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='DirectMessageIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='14'
      height='14'
      fill='none'
      viewBox='0 0 14 14'
    >
      <path
        fill='#fff'
        fillRule='evenodd'
        d='M0 10.706V4.8c0-1.68 0-2.52.327-3.162A3 3 0 0 1 1.638.327C2.28 0 3.12 0 4.8 0h3.9c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311c.327.642.327 1.482.327 3.162v.9c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311c-.642.327-1.482.327-3.162.327H5.52c-.377 0-.565 0-.74.043a1.5 1.5 0 0 0-.443.188c-.153.097-.284.232-.545.503l-.697.722c-.967 1.003-1.451 1.504-1.868 1.542a1.125 1.125 0 0 1-.954-.385C0 12.796 0 12.1 0 10.706ZM3 3.75A.75.75 0 0 1 3.75 3h6a.75.75 0 1 1 0 1.5h-6A.75.75 0 0 1 3 3.75ZM3.75 6a.75.75 0 0 0 0 1.5H6A.75.75 0 0 0 6 6H3.75Z'
        clipRule='evenodd'
      />
    </SvgIcon>
  )
}
