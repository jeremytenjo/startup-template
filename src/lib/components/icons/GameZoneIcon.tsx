import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

export default function GameZoneIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        fill: 'none',
        ...(props?.sx || {}),
      }}
      data-id='GameZoneIcon'
      width='19'
      height='19'
      viewBox='0 0 19 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M9.5 6.10052L14.5965 3.55026L9.5 1V9.50087M6.10236 9.49237L1.43061 12.1616C1.29988 12.2358 1.19115 12.3433 1.11551 12.4732C1.03986 12.6032 1 12.7508 1 12.9012C1 13.0516 1.03986 13.1993 1.11551 13.3292C1.19115 13.4591 1.29988 13.5667 1.43061 13.6408L8.65059 17.7722C8.90884 17.9214 9.2018 18 9.5 18C9.79821 18 10.0912 17.9214 10.3494 17.7722L17.5694 13.6408C17.7001 13.5667 17.8088 13.4591 17.8845 13.3292C17.9601 13.1993 18 13.0516 18 12.9012C18 12.7508 17.9601 12.6032 17.8845 12.4732C17.8088 12.3433 17.7001 12.2358 17.5694 12.1616L12.8976 9.50087M4.81975 10.2234L14.1802 15.579M14.1802 10.2234L4.82825 15.579'
        stroke='white'
        strokeWidth='1.3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </SvgIcon>
  )
}
