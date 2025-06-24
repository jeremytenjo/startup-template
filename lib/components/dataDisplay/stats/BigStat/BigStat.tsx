import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Skeleton from '@useweb/ui/Skeleton'

import { Island } from '../../../../integrations/Useweb/theme/UiTheme/commonStyles/islandStyles.jsx'

export type BigStatProps = {
  icon?: any
  value?: any
  label?: string
  loading?: boolean
  labelRightIcon?: any
}

export default function BigStat(props: BigStatProps) {
  return (
    <Island
      data-id='BigStat'
      component='li'
      sx={{
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: ['40px 1fr', '50px 1fr'],
        width: '100%',
        p: ['15px', '30px'],
        justifyContent: 'center',
        justifyItems: 'start',
      }}
    >
      <Box
        data-id='Left'
        sx={{
          width: '40px',
        }}
      >
        <Skeleton
          loading={props.loading}
          circle
          sx={{
            width: '32px',
            height: '32px',
          }}
        >
          {props.icon}
        </Skeleton>
      </Box>

      <Box
        data-id='Right'
        sx={{
          display: 'grid',
          gap: ['5px', 0],
        }}
      >
        <Skeleton
          loading={props.loading}
          sx={{
            width: ['70px', '100px'],
            height: '10px',
          }}
        >
          <Text
            text={props.value}
            tag='p'
            sx={{
              fontSize: ['16px', '32px'],
              fontWeight: 'bold',
            }}
          />
        </Skeleton>
        <Skeleton loading={props.loading}>
          <Box
            data-id='Label'
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <Text
              text={props.label}
              tag='p'
              sx={{
                fontWeight: '600',
                color: 'neutral.200',
                fontSize: ['12px', '14px'],
                mt: '-6px',
              }}
            />
            {props.labelRightIcon || null}
          </Box>
        </Skeleton>
      </Box>
    </Island>
  )
}
