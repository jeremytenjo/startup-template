import React from 'react'
import Box from '@useweb/ui/Box'

export type AccessSignInPageLayoutProps = { children: any }

export default function AccessSignInPageLayout(props: AccessSignInPageLayoutProps) {
  return (
    <Box data-id='AccessSignInPageLayout' sx={{}}>
      {props.children}
    </Box>
  )
}
