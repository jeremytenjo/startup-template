import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Skeleton from '@useweb/ui/Skeleton'

export type MiniLabelProps = { label: string; sx?: BoxProps['sx']; loading?: boolean }

export default function MiniLabel(props: MiniLabelProps) {
  return (
    <Box
      data-id='MiniLabel'
      sx={{
        backgroundColor: 'neutral.600',
        borderRadius: '20px',
        textTransform: 'uppercase',
        textAlign: 'center',

        py: '4px',
        px: 1,
        width: 'fit-content',

        ...props.sx,
      }}
    >
      <Skeleton
        loading={props.loading}
        sx={{
          width: '100px',
        }}
      >
        <Text
          text={props.label}
          tag='p'
          sx={{
            fontWeight: '600',
            color: 'neutral.150',
            fontSize: '12px',
          }}
        />
      </Skeleton>
    </Box>
  )
}
