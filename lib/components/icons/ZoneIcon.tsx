import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function ZoneIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      data-id='ZoneIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='12'
      height='13'
      fill='none'
      viewBox='0 0 12 13'
    >
      <path
        fill='#BBBBBD'
        d='M5.077 8.017a.462.462 0 0 1-.326-.787l4.556-4.556a1.607 1.607 0 0 0-.769-.195H1.615A1.617 1.617 0 0 0 0 4.094v6.923a1.617 1.617 0 0 0 1.615 1.616h6.923a1.617 1.617 0 0 0 1.616-1.616V4.094c0-.268-.067-.532-.195-.768L5.403 7.882a.46.46 0 0 1-.326.135Z'
      />
      <path
        fill='#BBBBBD'
        d='M11.539.633H8.308a.462.462 0 1 0 0 .923h2.116L9.307 2.674c.276.15.502.376.652.652l1.118-1.117v2.116a.461.461 0 1 0 .923 0v-3.23a.461.461 0 0 0-.461-.462Z'
      />
    </SvgIcon>
  )
}
