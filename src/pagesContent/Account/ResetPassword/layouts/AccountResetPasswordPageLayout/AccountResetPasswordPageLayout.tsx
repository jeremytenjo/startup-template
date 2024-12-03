import React from 'react'
import Box from '@useweb/ui/Box'

export type AccountResetPasswordPageLayoutProps = { children: any }

export default function AccountResetPasswordPageLayout(
  props: AccountResetPasswordPageLayoutProps,
) {
  return (
    <Box data-id='AccountResetPasswordPageLayout' sx={{}}>
      {props.children}
    </Box>
  )
}
