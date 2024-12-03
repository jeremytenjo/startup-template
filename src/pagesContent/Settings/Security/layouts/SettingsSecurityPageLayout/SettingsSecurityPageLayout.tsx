import React from 'react'
import Box from '@useweb/ui/Box'

export type SettingsSecurityPageLayoutProps = { children: any }

export default function SettingsSecurityPageLayout(
  props: SettingsSecurityPageLayoutProps,
) {
  return (
    <Box data-id='SettingsSecurityPageLayout' sx={{}}>
      {props.children}
    </Box>
  )
}
