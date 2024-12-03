import React from 'react'
import Box from '@useweb/ui/Box'

export type TermsOfServicePageLayoutProps = { children: any }

export default function TermsOfServicePageLayout(props: TermsOfServicePageLayoutProps) {
  return (
    <Box data-id='TermsOfServicePageLayout' sx={{}}>
      {props.children}
    </Box>
  )
}
