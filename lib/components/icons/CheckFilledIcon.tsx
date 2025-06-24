import React from 'react'
import SvgIcon, { type SvgIconProps } from '@mui/material/SvgIcon'

import colors from '../../../theme/tokens/colors.js'

export default function CheckFilledIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      {...(props || {})}
      sx={{
        width: '15px',
        height: 'auto',
        fill: colors.primary.background,
        ...(props?.sx || {}),
      }}
      data-id='CheckFilledIcon'
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill={colors.primary.dark}
      viewBox='0 0 24 24'
    >
      <path
        fill={colors.primary.main}
        fillRule='evenodd'
        d='m17.096 7.39-7.16 6.91-1.9-2.03c-.35-.33-.9-.35-1.3-.07-.39.29-.5.8-.26 1.21l2.25 3.66c.22.34.6.55 1.03.55.41 0 .8-.21 1.02-.55.36-.47 7.23-8.66 7.23-8.66.9-.92-.19-1.73-.91-1.03v.01Z'
        clipRule='evenodd'
      />
    </SvgIcon>
  )
}
