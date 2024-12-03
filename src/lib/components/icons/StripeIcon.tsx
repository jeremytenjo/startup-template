import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function StripeIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        fill: 'white',
        backgroundColor: 'white',
        borderRadius: '6px',
        ...(props?.sx || {}),
      }}
      data-id='StripeIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='none'
      viewBox='0 0 24 24'
    >
      <path
        fill='#635BFF'
        d='M3 0a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3Zm9.339 8.078c-.876 0-1.405.245-1.405.889 0 .702.91 1.011 2.04 1.395 1.841.623 4.265 1.444 4.276 4.49 0 2.95-2.364 4.648-5.805 4.648a11.55 11.55 0 0 1-4.514-.939v-3.924c1.39.759 3.143 1.32 4.516 1.32.925 0 1.587-.248 1.587-1.007 0-.776-.988-1.132-2.18-1.561-1.815-.654-4.104-1.479-4.104-4.224 0-2.917 2.232-4.665 5.589-4.665a10.95 10.95 0 0 1 4.101.758v3.874c-1.257-.675-2.844-1.054-4.101-1.054Z'
      />
    </SvgIcon>
  )
}
