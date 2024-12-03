import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function ThumbsUpIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='ThumbsUpIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='11'
      height='11'
      fill='none'
      viewBox='0 0 11 11'
    >
      <path
        fill='#BBBBBD'
        d='M8.38 10.87H3.144V4.062L6.81.395l.654.654a.69.69 0 0 1 .151.25c.04.104.06.204.059.3v.184L7.098 4.06h2.854c.28 0 .524.105.734.314.21.21.314.454.314.734v1.047a1.085 1.085 0 0 1-.079.393L9.35 10.242a1.06 1.06 0 0 1-.393.445 1.023 1.023 0 0 1-.576.184ZM2.096 4.062v6.81H0V4.06h2.095Z'
      />
    </SvgIcon>
  )
}
