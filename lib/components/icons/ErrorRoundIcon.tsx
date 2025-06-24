import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function ErrorRoundIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '20px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='ErrorRoundIcon'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8ZM6.28033 5.21967C5.98744 4.92678 5.51256 4.92678 5.21967 5.21967C4.92678 5.51256 4.92678 5.98744 5.21967 6.28033L6.93934 8L5.21967 9.71967C4.92678 10.0126 4.92678 10.4874 5.21967 10.7803C5.51256 11.0732 5.98744 11.0732 6.28033 10.7803L8 9.06066L9.71967 10.7803C10.0126 11.0732 10.4874 11.0732 10.7803 10.7803C11.0732 10.4874 11.0732 10.0126 10.7803 9.71967L9.06066 8L10.7803 6.28033C11.0732 5.98744 11.0732 5.51256 10.7803 5.21967C10.4874 4.92678 10.0126 4.92678 9.71967 5.21967L8 6.93934L6.28033 5.21967Z'
        fill='#FF4242'
      />
    </SvgIcon>
  )
}
