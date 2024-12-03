import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Skeleton from '@useweb/ui/Skeleton'

export type StatWithIconProps = {
  icon: any
  title: string
  value: string
  loading: boolean
  sx?: BoxProps['sx']
}

export default function StatWithIcon(props: StatWithIconProps) {
  return (
    <Box
      data-id='StatWithIcon'
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        ...(props.sx || {}),
      }}
    >
      <Skeleton
        loading={props.loading}
        sx={{
          width: [0, '30px'],
          height: '30px',
        }}
      >
        <Box data-id='Icon' sx={{}}>
          {props.icon}
        </Box>
      </Skeleton>

      <Box
        data-id='stats'
        sx={{
          display: 'grid',
        }}
      >
        <Skeleton
          loading={props.loading}
          sx={{
            width: '30px',
          }}
        >
          <Text
            text={props.title}
            tag='p'
            sx={{
              fontWeight: '650',
              color: 'neutral.200',
              fontSize: ['12px', '13px'],
              whiteSpace: 'nowrap',
            }}
          />
        </Skeleton>

        <Skeleton
          loading={props.loading}
          sx={{
            width: '30px',
          }}
        >
          <Text
            text={props.value || ''}
            className='StatWithIcon_value'
            tag='p'
            sx={{
              fontWeight: '650',
              fontSize: ['12px', '13px'],
              whiteSpace: 'nowrap',
            }}
          />
        </Skeleton>
      </Box>
    </Box>
  )
}
