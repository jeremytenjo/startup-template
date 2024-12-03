import React from 'react'
import Box from '@useweb/ui/Box'

export type AccountSignUpPageLayoutProps = { children: any }

export default function AccountSignUpPageLayout(props: AccountSignUpPageLayoutProps) {
  return (
    <Box data-id='AccountSignUpPageLayout' sx={{}}>
      {props.children}
    </Box>
  )
}
