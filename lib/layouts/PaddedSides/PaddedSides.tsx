import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'

export type PaddedSidesProps = {
  children: any
  sx?: BoxProps['sx']
  'data-id'?: string
}

export default function PaddedSides(props: PaddedSidesProps) {
  return (
    <Box
      data-id={props['data-id'] ?? 'PaddedSides'}
      sx={{
        px: '15px',
        ...(props.sx ?? {}),
      }}
    >
      {props.children}
    </Box>
  )
}
