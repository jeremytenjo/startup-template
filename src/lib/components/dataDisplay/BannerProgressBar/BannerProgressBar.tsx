import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Skeleton from '@useweb/ui/Skeleton'

import ProgressBar from '../ProgressBar/ProgressBar.js'

export type BannerProgressBarProps = {
  title: string
  loading: boolean
  progress: number | undefined
  sx?: BoxProps['sx']
}

export default function BannerProgressBar(props: BannerProgressBarProps) {
  return (
    <Box
      data-id='BannerProgressBar'
      sx={{
        ...(props.sx || {}),
      }}
    >
      <Skeleton loading={props.loading} sx={{}}>
        <Text
          text={props.title}
          tag='p'
          sx={{
            fontWeight: 700,
            fontSize: ['12px', '14px'],
            mb: 1,
            textAlign: ['center', , 'left'],
          }}
        />
      </Skeleton>
      <Skeleton loading={props.loading} sx={{}}>
        <ProgressBar progress={props.progress} />
      </Skeleton>
    </Box>
  )
}
