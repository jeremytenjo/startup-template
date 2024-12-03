import React from 'react'
import Box, { type BoxProps } from '@useweb/ui/Box'

type OnlineStatusBadgeProps = {
  sx: BoxProps['sx']
  show: boolean
}

export default function OnlineStatusBadge(props: OnlineStatusBadgeProps) {
  return props.show ? (
    <Box
      data-id='OnlineStatusBadge'
      sx={{
        width: '12px',
        height: '12px',
        backgroundColor: 'primary.main',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'primary.light',
        position: 'absolute',
        borderRadius: '100px',
        ...(props.sx || {}),
      }}
    ></Box>
  ) : null
}
