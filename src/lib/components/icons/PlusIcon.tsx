import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function PlusIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='PlusIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='15'
      height='16'
      fill='none'
      viewBox='0 0 15 16'
    >
      <path
        fill='#B6C1D1'
        fillRule='evenodd'
        d='M0 8a7.5 7.5 0 1 1 15 0A7.5 7.5 0 0 1 0 8Zm8.25-3a.75.75 0 0 0-1.5 0v2.25H4.5a.75.75 0 0 0 0 1.5h2.25V11a.75.75 0 0 0 1.5 0V8.75h2.25a.75.75 0 0 0 0-1.5H8.25V5Z'
        clipRule='evenodd'
      />
    </SvgIcon>
  )
}
