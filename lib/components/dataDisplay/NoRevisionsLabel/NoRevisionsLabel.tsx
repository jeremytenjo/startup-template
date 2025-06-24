import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

import RevisionIcon from '../../icons/RevisionIcon.js'

export type NoRevisionsLabelProps = { sx?: BoxProps['sx'] }

export default function NoRevisionsLabel(props: NoRevisionsLabelProps) {
  return (
    <Box
      data-id='NoRevisionsLabel'
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        ...props.sx,
      }}
    >
      <RevisionIcon
        sx={{
          width: '14px',
        }}
      />
      <Text
        text={`No Revisions`}
        tag='p'
        sx={{
          fontWeight: '600',
        }}
      />
    </Box>
  )
}
