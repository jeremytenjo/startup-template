import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function ChevronUpIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='ChevronUpIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='9'
      height='5'
      fill='none'
      viewBox='0 0 9 5'
    >
      <path
        fill='#00AA6D'
        fillRule='evenodd'
        d='M3.793.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.414L4.5 2.414 2.207 4.707A1 1 0 0 1 .793 3.293l3-3Z'
        clipRule='evenodd'
      />
    </SvgIcon>
  )
}
