import React from 'react'
import Box from '@useweb/ui/Box'

export type SettingsPagesLayoutContentProps = {
  children: any
}

export default function SettingsPagesLayoutContent(
  props: SettingsPagesLayoutContentProps,
) {
  return (
    <Box data-id='SettingsPagesLayoutContent' sx={{}}>
      {props.children}
    </Box>
  )
}
