import React from 'react'
import Box from '@useweb/ui/Box'

export type FaqPageLayoutProps = { children: any }

export default function FaqPageLayout(props: FaqPageLayoutProps) {
  return (
    <Box data-id='FaqPageLayout' sx={{}}>
      {props.children}
    </Box>
  )
}
