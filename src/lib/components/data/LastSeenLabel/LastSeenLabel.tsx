import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Skeleton from '@useweb/ui/Skeleton'

import type DateSchema from '../../../../data/_commonSchemas/DateSchema/date.schema.js'
import RoundFilledClockIcon from '../../icons/RoundFilledClockIcon.js'
import AgoText from '../AgoText/AgoText.js'

export type LastSeenLabelProps = {
  loading: boolean
  date: DateSchema | undefined
  sx?: BoxProps['sx']
  skeletonSx?: BoxProps['sx']
}

export default function LastSeenLabel(props: LastSeenLabelProps) {
  return (
    <Skeleton
      loading={props.loading}
      wrapperSx={{
        ...props.sx,
      }}
      sx={{
        width: '100px',
        ...props.skeletonSx,
      }}
    >
      <Box
        data-id='LastSeenLabel'
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          whiteSpace: 'nowrap',
          ...props.sx,
        }}
      >
        <RoundFilledClockIcon
          sx={{
            width: '12px',
          }}
        />
        <Text
          text={`Last seen: `}
          tag='span'
          sx={{
            fontWeight: '700',
            color: `neutral.200`,
          }}
        />
        <AgoText date={props.date || 0} />
      </Box>
    </Skeleton>
  )
}
