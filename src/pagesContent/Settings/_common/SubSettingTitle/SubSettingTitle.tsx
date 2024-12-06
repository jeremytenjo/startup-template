import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'

export type SubSettingTitleProps = {
  title: string
  subTitle: string
  sx?: BoxProps['sx']
}

export default function SubSettingTitle(props: SubSettingTitleProps) {
  return (
    <Box
      data-id='SubSettingTitle'
      sx={{
        mb: 3,
        ...(props.sx || {}),
      }}
    >
      <Box
        data-id='Title'
        sx={{
          fontWeight: '600',
          fontSize: '15px',
          color: 'neutral.100',
        }}
      >
        {props.title}
      </Box>

      <Box
        data-id='SubTitle'
        sx={{
          fontSize: '12px',
          color: 'neutral.200',
        }}
      >
        {props.subTitle}
      </Box>
    </Box>
  )
}
