import React from 'react'
import Box from '@useweb/ui/Box'

export type AccessSignUpPageLayoutProps = { children: any }

export default function AccessSignUpPageLayout(props: AccessSignUpPageLayoutProps) {
  return (
    <Box data-id='AccessSignUpPageLayout' sx={{}}>
      {props.children}
    </Box>
  )
}
