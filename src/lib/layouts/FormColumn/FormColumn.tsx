import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'

export type FormColumnProps = {
  title: string
  children: React.ReactNode
  sx?: BoxProps['sx']
  'data-id'?: string
}

export default function FormColumn(props: FormColumnProps) {
  return (
    <Box
      data-id={props['data-id'] ?? 'FormColumn'}
      sx={{
        maxWidth: '630px',
        margin: '0 auto',
        ...(props.sx ?? {}),
      }}
    >
      <Text
        text={props.title}
        tag='h1'
        variant='h1'
        sx={{
          mb: 3,
        }}
      />

      {props.children}
    </Box>
  )
}
