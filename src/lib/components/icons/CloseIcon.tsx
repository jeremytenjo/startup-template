import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function CloseIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='CloseIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='none'
      viewBox='0 0 16 16'
    >
      <path
        fill='#fff'
        fillRule='evenodd'
        d='m7.882 10.004 5.303 5.303a1.5 1.5 0 0 0 2.122-2.122l-5.305-5.303 5.304-5.303A1.5 1.5 0 0 0 13.184.46l-5.302 5.3L2.58.458a1.5 1.5 0 1 0-2.122 2.12l5.305 5.304-5.304 5.304a1.5 1.5 0 1 0 2.122 2.12l5.302-5.302Z'
        clipRule='evenodd'
      />
    </SvgIcon>
  )
}
