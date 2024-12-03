import React from 'react'
import Box, { type BoxProps } from '@useweb/ui/Box'

export type CenterIslandProps = {
  children: any
  sx?: BoxProps['sx']
  parentSx?: BoxProps['sx']
  'data-id'?: string
}

export default function CenterIsland(props: CenterIslandProps) {
  return (
    <Box
      data-id={props['data-id'] || 'CenterIsland'}
      sx={{
        display: 'grid',
        alignContent: 'start',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'neutral.600',
        gridAutoFlow: 'row',
        gridGap: '50px',
        justifyItems: 'center',
        mt: '10px',
        ...(props.parentSx || {}),
      }}
    >
      <Box
        data-id={'Island'}
        className='mainBackground'
        sx={{
          display: 'grid',
          alignContent: 'start',
          maxWidth: '440px',
          backgroundColor: 'neutral.600',
          gridAutoFlow: 'row',
          justifyItems: 'center',
          paddingLeft: '30px',
          paddingRight: '30px',
          paddingTop: '30px',
          paddingBottom: '30px',
          width: '100%',
          ...(props.sx || {}),
        }}
      >
        {props.children}
      </Box>
    </Box>
  )
}
