import React from 'react'
import Box from '@useweb/ui/Box'

export type SettingsEditProfilePageLayoutProps = { children: any }

export default function SettingsEditProfilePageLayout(
  props: SettingsEditProfilePageLayoutProps,
) {
  return (
    <Box data-id='SettingsEditProfilePageLayout' sx={{}}>
      {props.children}
    </Box>
  )
}
