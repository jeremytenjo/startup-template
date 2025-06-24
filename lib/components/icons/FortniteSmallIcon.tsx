import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function FortniteSmallIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='FortniteSmallIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='38'
      fill='none'
      viewBox='0 0 16 38'
    >
      <path
        fill='#fff'
        d='M0 19c0 10.452.026 19 .06 19 .052 0 7.06-1.301 7.919-1.474l.447-.086V22.49h5.33v-1.275c0-.698.027-2.517.06-4.05l.052-2.775H8.426V8.272h3.138c1.728 0 3.138-.017 3.138-.043 0-.095.688-7.453.731-7.824L15.485 0H0v19Z'
      />
    </SvgIcon>
  )
}
