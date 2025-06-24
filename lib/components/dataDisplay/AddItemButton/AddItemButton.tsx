import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import IconButton from '@useweb/ui/IconButton'

import PlusIcon from '../../icons/PlusIcon.js'

export type AddItemButtonProps = {
  label: string
  onClick: () => any
  sx?: BoxProps['sx']
}

export default function AddItemButton(props: AddItemButtonProps) {
  return (
    <Box
      data-id='AddItemButton'
      onClick={props.onClick}
      type='button'
      sx={{
        p: 2,
        width: '100%',
        display: 'grid',
        justifyContent: 'center',
        border: '1px solid',
        borderColor: 'neutral.300',
        borderRadius: '14px',
        justifyItems: 'center',
        backgroundColor: 'neutral.500',
        transition: '0.2s',
        gap: 1,
        cursor: 'pointer',
        ...props.sx,

        '&:hover': {
          backgroundColor: 'neutral.400',
          ...props.sx?.['&:hover'],
        },
      }}
    >
      <IconButton
        name='Plus'
        className='Counter_plusButton'
        data-id='Plus'
        sx={{
          width: '35px',
          height: '35px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'neutral.400',
          borderRadius: '12px',
          backgroundColor: 'neutral.300',
        }}
      >
        <PlusIcon />
      </IconButton>
      <Text
        text={props.label}
        tag='p'
        sx={{
          fontWeight: 'bold',
          color: 'neutral.150',
        }}
      />
    </Box>
  )
}
