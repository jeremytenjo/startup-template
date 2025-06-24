import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function TwitchIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='TwitchIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='21'
      fill='none'
      viewBox='0 0 18 21'
    >
      <path
        fill='#B6C1D1'
        fillRule='evenodd'
        d='M.9.5a.9.9 0 0 0-.9.9v14.194a.9.9 0 0 0 .9.9h4.116v3.03a.7.7 0 0 0 1.194.494l3.525-3.524h4.643a.9.9 0 0 0 .636-.264l2.722-2.722a.9.9 0 0 0 .264-.636V1.4a.9.9 0 0 0-.9-.9H.9Zm7.319 5.2a.75.75 0 0 0-1.5 0v4.272a.75.75 0 1 0 1.5 0V5.7Zm5.016 0a.75.75 0 1 0-1.5 0v4.272a.75.75 0 1 0 1.5 0V5.7Z'
        clipRule='evenodd'
      />
    </SvgIcon>
  )
}
