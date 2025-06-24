import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import { ButtonSpinner } from '@useweb/ui/Button'

import { Island } from '../../../integrations/Useweb/theme/UiTheme/commonStyles/islandStyles.js'

export type StatIslandProps = {
  title: any
  text: string
  textSx?: BoxProps['sx']
  loading?: boolean
}

export default function StatIsland(props: StatIslandProps) {
  return (
    <Island
      data-id='StatIsland'
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        backgroundColor: 'neutral.450',
        transition: '0.2s',
        height: '71px',
        position: 'relative',
      }}
    >
      {props.loading ? (
        <ButtonSpinner color='white' variant={''} />
      ) : (
        <Box
          data-id='Inner'
          sx={{
            display: 'grid',
            m: '0 auto',
            textAlign: 'center',
          }}
        >
          <Text
            text={props.text}
            tag='p'
            sx={{
              fontWeight: '700',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              ...props.textSx,
            }}
          />
          <Text
            text={props.title}
            tag='p'
            sx={{
              color: 'neutral.200',
              fontWeight: '500',
            }}
          />
        </Box>
      )}
    </Island>
  )
}
