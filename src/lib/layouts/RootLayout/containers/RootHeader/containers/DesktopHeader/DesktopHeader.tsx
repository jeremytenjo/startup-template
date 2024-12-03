import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

export type DesktopHeaderProps = { name?: string }

export default function DesktopHeader(props: DesktopHeaderProps) {
  return (
    <Box data-id='DesktopHeader' sx={{}}>
      <Text text={'DesktopHeader'} tag='p' sx={{}} />
    </Box>
  )
}
