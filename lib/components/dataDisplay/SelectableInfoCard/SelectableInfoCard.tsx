import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

import MiniLabel from '../MiniLabel/MiniLabel.js'
import { Island } from '../../../integrations/Useweb/theme/UiTheme/commonStyles/islandStyles.jsx'

export type SelectableInfoCardProps = {
  icon: any
  title: string
  description: string
  active: boolean
  onClick: () => void
  recommended?: boolean
  hideRecommendedLabelSpace?: boolean
  iconSx?: BoxProps['sx']
}

export default function SelectableInfoCard(props: SelectableInfoCardProps) {
  return (
    <Island
      data-id='AdTypeCard'
      sx={{
        borderWidth: '3px',
        display: 'grid',
        gap: 1,
        height: 'auto',
        alignContent: 'baseline',
        transition: '0.2s',
        userSelect: 'none',
        backgroundColor: 'neutral.450',

        ...(props.active
          ? {
              borderColor: 'primary.main',
            }
          : {
              cursor: 'pointer',

              '&:hover': {
                backgroundColor: 'neutral.300',
              },
            }),
      }}
      onClick={props.onClick}
    >
      <Box
        data-id='Inner'
        sx={{
          m: '0 auto',
          display: 'grid',
          justifyContent: 'center',
          justifyItems: 'center',
          gap: 1,
          mb: 1,
        }}
      >
        {!props.hideRecommendedLabelSpace && (
          <MiniLabel
            label='Recommended'
            sx={{
              visibility: props.recommended ? 'visible' : 'hidden',
              mb: 1,
            }}
          />
        )}
        {
          <props.icon
            sx={{
              width: '40px',
              ...(props.iconSx || {}),
            }}
          />
        }

        <Text
          text={props.title}
          tag='h3'
          sx={{
            fontWeight: '600',
            fontSize: '14px',
          }}
        />
      </Box>
      <Text
        text={props.description}
        tag='p'
        sx={{
          fontWeight: '500',
          textAlign: 'center',
        }}
      />
    </Island>
  )
}
