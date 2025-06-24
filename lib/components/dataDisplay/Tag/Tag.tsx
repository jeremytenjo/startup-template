import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Skeleton from '@useweb/ui/Skeleton'

export type TagProps = { title: any; loading?: boolean; sx?: BoxProps['sx'] }

export default function Tag(props: TagProps) {
  return (
    <Box
      data-id='Tag'
      sx={{
        backgroundColor: 'neutral.400',
        width: 'fit-content',
        borderRadius: '15px',
        px: '8px',
        py: '3px',
        ...props.sx,
      }}
    >
      <Skeleton
        loading={props.loading}
        sx={{
          width: '70px',
        }}
      >
        <Text
          text={props.title}
          tag='p'
          sx={{
            fontWeight: 'bold',
            color: 'neutral.200',
            textTransform: 'capitalize',
          }}
        />
      </Skeleton>
    </Box>
  )
}
