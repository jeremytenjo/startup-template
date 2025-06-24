import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function WarnRoundIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '20px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='WarnRoundIcon'
      width='15'
      height='16'
      viewBox='0 0 15 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 8C0 3.85786 3.35786 0.5 7.5 0.5C11.6421 0.5 15 3.85786 15 8C15 12.1421 11.6421 15.5 7.5 15.5C3.35786 15.5 0 12.1421 0 8ZM6.75 5C6.75 4.58579 7.08579 4.25 7.5 4.25C7.91421 4.25 8.25 4.58579 8.25 5C8.25 5.41421 7.91421 5.75 7.5 5.75C7.08579 5.75 6.75 5.41421 6.75 5ZM7.5 7.25C7.91421 7.25 8.25 7.58579 8.25 8V11C8.25 11.4142 7.91421 11.75 7.5 11.75C7.08579 11.75 6.75 11.4142 6.75 11V8C6.75 7.58579 7.08579 7.25 7.5 7.25Z'
        fill='#FFA842'
      />
    </SvgIcon>
  )
}
