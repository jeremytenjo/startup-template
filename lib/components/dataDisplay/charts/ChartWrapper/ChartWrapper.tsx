import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

import colors from '../../../../integrations/Useweb/theme/tokens/colors.js'
import { Island } from '../../../../integrations/Useweb/theme/UiTheme/commonStyles/islandStyles.js'
import { buttonVariantSmallStyles } from '../../../../integrations/Useweb/components/Button/Button.defaults.js'

export type ChartWrapperProps = {
  children: any
  title: string
  filters: {
    dayInterval: string
    active: boolean
    onClick: () => any
  }[]
  sx?: BoxProps['sx']
}

export default function ChartWrapper(props: ChartWrapperProps) {
  return (
    <Island
      data-id='ChartWrapper'
      sx={{
        borderRadius: '30px',
        p: ['20px', '32px'],
        display: 'grid',
        alignContent: 'space-between',
        height: '100%',
        overflowY: 'hidden',
        overflowX: 'auto',
        ...(props.sx || {}),
      }}
    >
      <Box
        data-id='Header'
        sx={{
          display: 'grid',
          gap: 2,
          gridAutoFlow: ['row', 'column'],
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: '32px',
        }}
      >
        <Text
          text={props.title}
          tag='p'
          sx={{
            fontSize: ['17px', '20px'],
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
          }}
        />
        <Box
          data-id='Filters'
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          {props.filters?.map((filter, index) => {
            return (
              <Box
                key={index}
                onClick={filter.onClick}
                sx={{
                  ...buttonVariantSmallStyles,
                  borderRadius: '20px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  border: '1px solid transparent',
                  fontWeight: 'bold',
                  transitionDuration: '0.2s',
                  ...(filter.active
                    ? {
                        color: 'white',
                        backgroundColor: colors.primary.dark,
                        borderColor: colors.primary.light,
                      }
                    : {
                        borderColor: 'transparent',
                        backgroundColor: 'neutral.300',
                      }),

                  '&:hover': {
                    backgroundColor: colors.primary.dark,
                    borderColor: colors.primary.light,
                  },
                }}
              >
                {filter.dayInterval}
              </Box>
            )
          })}
        </Box>
      </Box>

      {props.children}
    </Island>
  )
}
