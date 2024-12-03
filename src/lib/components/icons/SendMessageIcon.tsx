import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function SendMessageIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='SendMessageIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='14'
      height='14'
      fill='none'
      viewBox='0 0 14 14'
    >
      <path
        fill='#fff'
        d='m5.075 8.39-3.703-.966c-1.41-.367-1.521-2.326-.162-2.85L12.196.33c.923-.356 1.83.552 1.474 1.474L9.427 12.791c-.525 1.359-2.483 1.247-2.85-.162L5.61 8.926a.75.75 0 0 0-.536-.537Z'
      />
    </SvgIcon>
  )
}
