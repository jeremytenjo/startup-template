import React from 'react'
import Box from '@useweb/ui/Box'

export type HomePageLayoutProps = { children: any }

export default function HomePageLayout(props: HomePageLayoutProps) {
  return (
    <Box data-id='HomePageLayout' sx={{}}>
      {props.children}
    </Box>
  )
}
