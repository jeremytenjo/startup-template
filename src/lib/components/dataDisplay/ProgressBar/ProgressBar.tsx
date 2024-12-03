import React from 'react'
import LinearProgress from '@useweb/ui/LinearProgress'

export type ProgressBarProps = {
  progress: number | undefined
  backgroundColor?: string
  colorizeRemainingProgress?: boolean
}

export default function ProgressBar(props: ProgressBarProps) {
  return (
    <LinearProgress
      data-id='ProgressBar'
      value={props.progress || 0}
      variant='determinate'
      sx={{
        height: '12px',
        borderRadius: '50px',
        backgroundColor: props.backgroundColor || '#6e4c3b',
        '& .MuiLinearProgress-bar': {
          background: 'linear-gradient(90deg, #FE7F41 73%, #F6EF86 100%)',
        },

        ...(props.colorizeRemainingProgress && {
          backgroundColor:
            !props.progress || props.progress < 20
              ? '#4c1717'
              : props.progress < 80
              ? '#6e4c3b'
              : '#122d1f',
          '& .MuiLinearProgress-bar': {
            background:
              !props.progress || props.progress < 20
                ? 'linear-gradient(90deg, #ff0000 73%, #f17b7b 100%)'
                : props.progress < 80
                ? 'linear-gradient(90deg, #FE7F41 73%, #F6EF86 100%)'
                : 'linear-gradient(90deg, #2bcb2b 73%, #8ef686 100%)',
          },
        }),
      }}
    />
  )
}
