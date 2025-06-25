import React from 'react'
import Box from '@useweb/ui/Box'

export type SettingsPageLayoutProps = {
  children: React.ReactNode
}

export default function SettingsPageLayout(props: SettingsPageLayoutProps) {
  return (
    <Box data-id='SettingsPageLayout' sx={{}}>
      {props.children}
    </Box>
  )
}
