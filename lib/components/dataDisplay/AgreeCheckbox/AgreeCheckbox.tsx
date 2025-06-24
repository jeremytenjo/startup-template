import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import { useFormContext } from '@useweb/ui/Form'
import type { CheckboxProps } from '@useweb/ui/Checkbox'
import Checkbox from '@useweb/ui/Checkbox'
import ErrorMessage from '@useweb/ui/ErrorMessage'

import type { DocumentDialogProps } from '../DocumentDialog/DocumentDialog.js'
import DocumentDialog from '../DocumentDialog/DocumentDialog.js'

export type AgreeCheckboxProps<DataSchema> = {
  name: keyof DataSchema
  label: string
  title: string
  loading: boolean
  error: any
  triggerLabel?: string
  triggerComponent?: DocumentDialogProps['triggerComponent']
  dialogContent: DocumentDialogProps['dialogContent']
  checkboxProps?: Omit<CheckboxProps<any>, 'name'>
  sx?: BoxProps['sx']
}

export default function AgreeCheckbox<DataSchema>(props: AgreeCheckboxProps<DataSchema>) {
  const formContext = useFormContext()

  const onAgree = () => {
    formContext.setValue(props.name as string, true)

    props.checkboxProps?.onChange?.({
      value: true,
    })
  }

  if (props.error) {
    return (
      <ErrorMessage
        error={props.error}
        message='Error. Please contact support. Sorry for the inconvenience.'
        sx={{
          ...props.sx,
        }}
      />
    )
  }

  return (
    <Checkbox
      data-id='AgreeCheckbox'
      {...(props.checkboxProps || {})}
      name={props.name}
      preventLabelClick
      sx={{
        ...(props.sx || {}),
        '& [data-id="Checkbox_wrapper"]': {
          ml: '-11px',
        },
      }}
      label={
        <Box>
          <Text text={`${props.label} `} tag='span' sx={{}} />
          <DocumentDialog
            title={props.title}
            onAgree={onAgree}
            loading={props.loading}
            triggerComponent={
              props.triggerLabel ? (
                <>
                  <Text
                    tag='span'
                    text={props.triggerLabel}
                    sx={{
                      fontSize: '14px',
                      textDecoration: 'underline',
                      color: 'primary.main',
                      cursor: 'pointer',
                    }}
                  />
                  {` `}
                </>
              ) : (
                props.triggerComponent || null
              )
            }
            dialogContent={props.dialogContent}
          />
        </Box>
      }
    />
  )
}
