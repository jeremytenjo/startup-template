import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

import WarnRoundIcon from '../../icons/WarnRoundIcon.js'
import ErrorRoundIcon from '../../icons/ErrorRoundIcon.js'
import CheckCircleIcon from '../../icons/CheckCircleIcon.js'
import colors from '../../../../theme/tokens/colors.js'

export type StatusLabelProps = {
  type: 'warning' | 'success' | 'error'
  title: string
  sx?: BoxProps['sx']
}

export default function StatusLabel(props: StatusLabelProps) {
  const typeData = typeProps[props.type]

  return (
    <Box
      data-id='StatusLabel'
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        ...(props.sx ?? {}),
      }}
    >
      {typeData.icon || null}
      <Text
        text={`${props.title}`}
        tag='p'
        sx={{
          color: typeData.color,
          fontWeight: 'bold',
          textTransform: 'capitalize',
        }}
      />
    </Box>
  )
}

const typeProps = {
  success: {
    icon: (
      <CheckCircleIcon
        sx={{
          width: '15px',
          fill: colors.semantic.success[100],
        }}
      />
    ),
    color: 'semantic.success.100',
  },

  warning: {
    icon: (
      <WarnRoundIcon
        sx={{
          width: '15px',
        }}
      />
    ),
    color: 'semantic.warning.100',
  },

  error: {
    icon: (
      <ErrorRoundIcon
        sx={{
          width: '15px',
        }}
      />
    ),
    color: 'semantic.error.100',
  },
}
