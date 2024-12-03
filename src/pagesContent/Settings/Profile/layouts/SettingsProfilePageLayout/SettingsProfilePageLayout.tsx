import React from 'react'
import Box from '@useweb/ui/Box'

export type SettingsProfilePageLayoutProps = { children: any }

export default function SettingsProfilePageLayout(props: SettingsProfilePageLayoutProps) {
  return (
    <Box data-id='SettingsProfilePageLayout' sx={{}}>
      {props.children}
    </Box>
  )
}
