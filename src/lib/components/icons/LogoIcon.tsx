import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function LogoIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '20px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='LogoIcon'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 20 20'
    >
      <path
        fill='url(#a)'
        d='M11.264 1.14c-.652-1.184-2.368-1.184-3.021 0a28 28 0 0 0-2.114 4.895.35.35 0 0 1-.33.223 30 30 0 0 0-4.375.436C.087 6.927-.502 8.53.514 9.524a32.004 32.004 0 0 0 3.491 2.961.274.274 0 0 1 .11.31 27.6 27.6 0 0 0-1.172 5.065c-.19 1.424 1.318 2.298 2.495 1.694a29.295 29.295 0 0 0 4.085-2.537.4.4 0 0 1 .462 0 29.001 29.001 0 0 0 4.085 2.537c1.177.604 2.685-.27 2.495-1.694a27.6 27.6 0 0 0-1.171-5.065.274.274 0 0 1 .11-.31 31.998 31.998 0 0 0 3.49-2.96c1.016-.994.427-2.598-.91-2.831a29.998 29.998 0 0 0-4.376-.436.35.35 0 0 1-.33-.223 27.703 27.703 0 0 0-2.114-4.894Z'
      />
      <defs>
        <linearGradient
          id='a'
          x1='9.754'
          x2='9.754'
          y1='.252'
          y2='19.748'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#2DFF7A' />
          <stop offset='1' stopColor='#A1FFC7' />
        </linearGradient>
      </defs>
    </SvgIcon>
  )
}
