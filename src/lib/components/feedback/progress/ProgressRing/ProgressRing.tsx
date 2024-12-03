import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'

export type ProgressRingProps = {
  progress: number | undefined
  sx?: BoxProps['sx']
  strokeColor: string
}

export default function ProgressRing(props: ProgressRingProps) {
  return (
    <Box
      data-id='ProgressRing'
      sx={{
        width: '120px',
        height: '120px',
        position: 'absolute',
        pointerEvents: 'none',
        ...props.sx,

        '& svg': {
          height: '100%',
          width: '100%',
          ...(props.sx?.['& svg'] || {}),
        },
        '& path': {
          stroke: props.strokeColor || 'red',
          strokeWidth: '2',
          fill: 'transparent',
          strokeDasharray: `${props.progress || 0}, 100`,
          borderRadius: '4px',
          ...(props.sx?.['& path'] || {}),
        },
      }}
    >
      <svg viewBox='0 0 36 36'>
        <path
          d='M18 2.0845
a 15.9155 15.9155 0 0 1 0 31.831
a 15.9155 15.9155 0 0 1 0 -31.831'
        />
      </svg>
    </Box>
  )
}
