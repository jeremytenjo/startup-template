import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

import type { ProgressMilestonesBarProps } from '../../ProgressMilestonesBar.js'

export type ProgressMilestonesBarPointProps = {
  progress: ProgressMilestonesBarProps['progress']
  milestone: ProgressMilestonesBarProps['milestones'][0]
  sx?: BoxProps['sx']
}

export const ProgressMilestonesBarPointSize = 40

export default function ProgressMilestonesBarPoint(
  props: ProgressMilestonesBarPointProps,
) {
  return (
    <Box
      data-id='ProgressMilestonesBarPoint'
      sx={{
        width: `${ProgressMilestonesBarPointSize}px`,
        height: `${ProgressMilestonesBarPointSize}px`,
        borderRadius: '50%',
        backgroundColor:
          props.progress >= props.milestone.percent ? 'primary.main' : '#0a412d',
        display: 'grid',
        placeItems: 'center',
        ...props.sx,
      }}
    >
      {props.milestone?.percent > 0 && (
        <Text
          text={`${props.milestone.percent}%`}
          tag='p'
          sx={{
            fontWeight: 'bold',
            fontSize: '11px',
          }}
        />
      )}
    </Box>
  )
}
