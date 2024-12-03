import React from 'react'
import Box from '@useweb/ui/Box'

export type SettingsBillingPageLayoutProps = { children: any }

export default function SettingsBillingPageLayout(props: SettingsBillingPageLayoutProps) {
  return (
    <Box data-id='SettingsBillingPageLayout' sx={{}}>
      {props.children}
    </Box>
  )
}
