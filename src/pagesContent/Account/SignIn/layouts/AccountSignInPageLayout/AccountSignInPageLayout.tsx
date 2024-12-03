import React from 'react'
import Box from '@useweb/ui/Box'

export type AccountSignInPageLayoutProps = { children: any }

export default function AccountSignInPageLayout(props: AccountSignInPageLayoutProps) {
  return (
    <Box data-id='AccountSignInPageLayout' sx={{}}>
      {props.children}
    </Box>
  )
}
