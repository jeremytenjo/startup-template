import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function RevisionIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '20px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='RevisionIcon'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.49922 11.4999C6.39922 13.3999 9.59922 13.3999 11.4992 11.4999C12.1992 10.7999 12.6992 9.7999 12.8992 8.7999L14.8992 9.0999C14.6992 10.5999 13.9992 11.8999 12.9992 12.8999C10.2992 15.5999 5.89922 15.5999 3.09922 12.8999L0.899219 15.0999L0.199219 8.6999L6.59922 9.3999L4.49922 11.4999Z'
        fill='white'
      />
      <path
        d='M15.7992 7.2999L9.39922 6.5999L11.4992 4.4999C9.59922 2.5999 6.39922 2.5999 4.49922 4.4999C3.79922 5.1999 3.29922 6.1999 3.09922 7.1999L1.09922 6.8999C1.29922 5.3999 1.99922 4.0999 2.99922 3.0999C4.39922 1.6999 6.09922 1.0999 7.89922 1.0999C9.69922 1.0999 11.4992 1.7999 12.7992 3.0999L14.9992 0.899902L15.7992 7.2999Z'
        fill='white'
      />
    </SvgIcon>
  )
}
