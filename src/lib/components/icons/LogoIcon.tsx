import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function LogoIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='LogoIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      fill='none'
      viewBox='0 0 20 20'
    >
      <path
        fill='#2DFF7A'
        d='M11.264.889c-.652-1.185-2.368-1.185-3.021 0a28 28 0 0 0-2.114 4.894.35.35 0 0 1-.33.223 30 30 0 0 0-4.375.436c-1.337.233-1.926 1.837-.91 2.83a31.994 31.994 0 0 0 3.491 2.96.274.274 0 0 1 .11.31 27.598 27.598 0 0 0-1.172 5.066c-.19 1.424 1.318 2.298 2.495 1.694a29.305 29.305 0 0 0 4.085-2.537.4.4 0 0 1 .462 0 29.011 29.011 0 0 0 4.085 2.537c1.177.604 2.685-.27 2.495-1.694a27.6 27.6 0 0 0-1.171-5.065.274.274 0 0 1 .11-.31 32 32 0 0 0 3.49-2.96c1.016-.994.427-2.598-.91-2.831a30 30 0 0 0-4.376-.436.35.35 0 0 1-.33-.223A27.703 27.703 0 0 0 11.265.889Z'
      />
    </SvgIcon>
  )
}
