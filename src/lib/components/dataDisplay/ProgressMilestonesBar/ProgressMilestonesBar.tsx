import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'

import ProgressMilestonesBarPoint, {
  ProgressMilestonesBarPointSize,
} from './_common/ProgressMilestonesBarPoint/ProgressMilestonesBarPoint.js'

export type ProgressMilestonesBarProps = {
  progress: number
  progressPoint: {
    component: any
    componentWidth: number
    componentHeight: number
  }
  milestones: {
    percent: number
    component: any
  }[]
  milestoneComponentWidth: number
  sx?: BoxProps['sx']
}

export default function ProgressMilestonesBar(props: ProgressMilestonesBarProps) {
  return (
    <Box
      data-id='ProgressMilestonesBar'
      sx={{
        position: 'relative',
        width: `calc(100% - ${props.milestoneComponentWidth * 2}px)`,
        height: `${ProgressMilestonesBarPointSize}px`,
        mx: `${props.milestoneComponentWidth}px`,
        my: `${props.progressPoint.componentHeight}px`,
        ...props.sx,
      }}
    >
      <Box
        data-id='ProgressPoint'
        sx={{
          position: 'absolute',
          bottom: '30px',
          left: `calc(${props.progress}% - ${props.progressPoint.componentWidth / 2}px)`,
          width: `${props.progressPoint.componentWidth}px`,
          height: `${props.progressPoint.componentHeight}px`,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {props.progressPoint.component}
      </Box>

      <Bar
        data-id='BarBackground'
        sx={{
          width: '100%',
          backgroundColor: '#0a412d',
        }}
      />

      <Bar
        data-id='BarForeground'
        sx={{
          width: `${props.progress}%`,
          backgroundColor: 'primary.main',
        }}
      />

      {props.milestones.map((milestone) => {
        return (
          <Box
            key={milestone.percent}
            data-id='Milestone'
            sx={{
              position: 'absolute',
              left: `calc(${milestone.percent}% - 17px)`,
              top: 0,
              bottom: 0,
              display: 'grid',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <ProgressMilestonesBarPoint progress={props.progress} milestone={milestone} />

            <Box
              data-id='MilestoneComponentWrapper'
              sx={{
                position: 'absolute',
                top: '60px',
                m: '0 auto',
                left:
                  milestone.percent === 0
                    ? '-5px'
                    : `-${
                        (props.milestoneComponentWidth - ProgressMilestonesBarPointSize) /
                        2
                      }px`,
              }}
            >
              {milestone.component}
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

const Bar = (props: { sx: BoxProps['sx']; 'data-id': string }) => {
  return (
    <Box
      data-id={props['data-id']}
      sx={{
        position: 'absolute',
        top: '15px',
        left: 0,
        bottom: 0,
        borderRadius: '50px',
        height: '5px',

        ...props.sx,
      }}
    ></Box>
  )
}
