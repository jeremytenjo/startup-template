import React from 'react'
import Box from '@useweb/ui/Box'

export type AccessResetPasswordPageLayoutProps = { children: any }

export default function AccessResetPasswordPageLayout(
  props: AccessResetPasswordPageLayoutProps,
) {
  return (
    <Box data-id='AccessResetPasswordPageLayout' sx={{}}>
      {props.children}
    </Box>
  )
}
