import React from 'react'
import Box from '@useweb/ui/Box'

export type PrivacyPolicyPageLayoutProps = { children: any }

export default function PrivacyPolicyPageLayout(props: PrivacyPolicyPageLayoutProps) {
  return (
    <Box data-id='PrivacyPolicyPageLayout' sx={{}}>
      {props.children}
    </Box>
  )
}
