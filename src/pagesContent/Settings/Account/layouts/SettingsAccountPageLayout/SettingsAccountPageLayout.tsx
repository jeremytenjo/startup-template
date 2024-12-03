import React from 'react'
import Box from '@useweb/ui/Box'

export type SettingsAccountPageLayoutProps = { children: any }

export default function SettingsAccountPageLayout(props: SettingsAccountPageLayoutProps) {
  return (
    <Box data-id='SettingsAccountPageLayout' sx={{}}>
      {props.children}
    </Box>
  )
}
