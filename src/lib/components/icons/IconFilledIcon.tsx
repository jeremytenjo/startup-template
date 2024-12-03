import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

import colors from '../../../theme/tokens/colors.js'

export default function IconFilledIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '20px',
        height: 'auto',
        ...(props?.sx || {}),
      }}
      xmlns='http://www.w3.org/2000/svg'
      width='17'
      height='17'
      fill='none'
      viewBox='0 0 17 17'
    >
      <path
        fill={colors.neutral[150]}
        d='M2.595 14.614a8.5 8.5 0 1 1 11.81-12.228 8.5 8.5 0 0 1-11.81 12.228Zm7.2-6.01L12.2 6.2 11 5 8.604 7.406 6.2 5 5 6.2l2.406 2.405L5 11.01l1.2 1.198 2.405-2.405 2.406 2.405 1.198-1.198-2.405-2.406h-.009Z'
      />
    </SvgIcon>
  )
}
