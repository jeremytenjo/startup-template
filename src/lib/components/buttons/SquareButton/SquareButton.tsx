import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import { ButtonSpinner } from '@useweb/ui/Button'

export type SquareButtonProps = {
  label: string
  icon: any
  onClick?: () => void
  sx?: BoxProps['sx']
  disabled?: boolean
  loading?: boolean
}

export default function SquareButton(props: SquareButtonProps) {
  return (
    <Box
      data-id='SquareButton'
      onClick={props.onClick}
      sx={{
        px: '15px',
        background: 'linear-gradient(180deg, #09D58B 0%, #005B3A 100%)',
        borderRadius: '10px',
        border: '1px solid',
        borderColor: 'primary.light',
        display: 'grid',
        placeItems: 'center',
        position: 'relative',
        height: '85px',

        ...props.sx,

        ...(props.disabled && {
          pointerEvents: 'none',
          opacity: 0.5,
        }),

        ...(props.onClick && {
          cursor: 'pointer',
        }),

        '& svg': {
          transform: 'translateY(5px)',
        },
        '& p': {
          transform: 'translateY(-5px)',
        },
      }}
    >
      {props.loading ? (
        <ButtonSpinner color='white' variant={''} />
      ) : (
        <>
          {props.icon || null}

          <Text
            text={props.label}
            tag='p'
            sx={{
              fontWeight: '600',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              textAlign: 'center',
            }}
          />
        </>
      )}
    </Box>
  )
}
