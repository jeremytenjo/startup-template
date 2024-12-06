import React from 'react'
import Box from '@useweb/ui/Box'

export type FormFieldDescriptionProps = { title: string; subTitle: string }

export default function FormFieldDescription(props: FormFieldDescriptionProps) {
  return (
    <Box
      data-id='FormFieldDescription'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        gap: 1,
      }}
    >
      <Box data-id='Info' sx={{}}>
        <Box
          data-id='Title'
          sx={{
            fontWeight: '500',
            fontSize: '14px',
          }}
        >
          {props.title}
        </Box>

        <Box
          data-id='SubTitle'
          sx={{
            color: 'neutral.200',
            fontSize: '12px',
          }}
        >
          {props.subTitle}
        </Box>
      </Box>
    </Box>
  )
}
