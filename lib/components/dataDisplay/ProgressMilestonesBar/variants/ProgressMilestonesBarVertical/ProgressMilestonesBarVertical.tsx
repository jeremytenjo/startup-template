import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'

import type { ProgressMilestonesBarProps } from '../../ProgressMilestonesBar.js'
import ProgressMilestonesBarPoint from '../../_common/ProgressMilestonesBarPoint/ProgressMilestonesBarPoint.js'

export type ProgressMilestonesBarVerticalProps = ProgressMilestonesBarProps

export default function ProgressMilestonesBarVertical(
  props: ProgressMilestonesBarVerticalProps,
) {
  return (
    <Box data-id='ProgressMilestonesBarVertical' sx={{}}>
      <Box data-id='ProgressMilestonesBarVerticalHeader' sx={{}}>
        {props.progressPoint.component}
      </Box>

      <Box
        data-id='ProgressMilestonesBarVerticalMilestones'
        sx={{
          display: 'grid',
          gap: 2,
          position: 'relative',
        }}
      >
        <Bar
          data-id='ProgressMilestonesBarVerticalBarBackground'
          sx={{
            height: '100%',
            backgroundColor: '#0a412d',
          }}
        />

        <Bar
          data-id='ProgressMilestonesBarVerticalBarForeground'
          sx={{
            height: `${props.progress}%`,
            backgroundColor: 'primary.main',
          }}
        />

        <Box
          data-id='ProgressMilestonesBarVerticalBarMilestones'
          sx={{
            display: 'grid',
            gap: 3,
          }}
        >
          {props.milestones.map((milestone) => (
            <Box
              key={milestone.percent}
              data-id='ProgressMilestonesBarVerticalMilestone'
              sx={{
                display: 'flex',
                gap: 3,
              }}
            >
              <ProgressMilestonesBarPoint
                progress={props.progress}
                milestone={milestone}
              />

              {milestone.component}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

const Bar = (props: { sx: BoxProps['sx']; 'data-id': string }) => {
  return (
    <Box
      data-id={props['data-id']}
      sx={{
        position: 'absolute',
        top: 0,
        left: '18px',
        width: '5px',
        borderRadius: '50px',
        zIndex: -1,

        ...props.sx,
      }}
    ></Box>
  )
}
