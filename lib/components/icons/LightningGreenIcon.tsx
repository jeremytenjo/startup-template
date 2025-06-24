import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function LightningGreenIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '20px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      xmlns='http://www.w3.org/2000/svg'
      width='34'
      height='48'
      fill='none'
      viewBox='0 0 34 48'
    >
      <path
        fill='#1AFFAC'
        fillRule='evenodd'
        d='M1.978 26.988H15.01l-1.438 18.85c-.153 2.01 2.395 2.964 3.566 1.332 6.005-8.373 16.482-22.992 16.482-22.992.946-1.32.013-3.169-1.6-3.169l-13.03-.005 1.437-18.849c.153-2.009-2.4-2.958-3.57-1.326L.38 23.82c-.947 1.32-.014 3.17 1.6 3.17Z'
        clipRule='evenodd'
      />
    </SvgIcon>
  )
}
