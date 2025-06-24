import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function AttachFileIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='AttachFileIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='15'
      height='17'
      fill='none'
      viewBox='0 0 15 17'
    >
      <path
        fill='#B6C1D1'
        d='M12 11a.75.75 0 0 0-1.5 0v1.5H9A.75.75 0 0 0 9 14h1.5v1.5a.75.75 0 0 0 1.5 0V14h1.5a.75.75 0 0 0 0-1.5H12V11Z'
      />
      <path
        fill='#B6C1D1'
        d='M0 4.1c0-1.26 0-1.89.245-2.371A2.25 2.25 0 0 1 1.23.745C1.709.5 2.339.5 3.6.5h2.55c.21 0 .315 0 .395.04.07.037.128.094.164.165.041.08.041.185.041.395v1.65a3 3 0 0 0 3 3h1.65c.21 0 .315 0 .395.04.07.037.128.094.164.165.041.08.041.185.041.395v1.8c0 .21 0 .315-.04.395a.375.375 0 0 1-.165.164c-.08.041-.185.041-.395.041h-.15a4.5 4.5 0 0 0-4.5 4.5v1.65c0 .21 0 .315-.04.395a.375.375 0 0 1-.165.164c-.08.041-.185.041-.395.041H3.6c-1.26 0-1.89 0-2.371-.245a2.25 2.25 0 0 1-.984-.984C0 13.791 0 13.162 0 11.9V4.1Z'
      />
      <path
        fill='#B6C1D1'
        d='M8.25 1.03a.53.53 0 0 1 .905-.375l2.69 2.69a.53.53 0 0 1-.375.905H9.75a1.5 1.5 0 0 1-1.5-1.5V1.03Z'
      />
    </SvgIcon>
  )
}
