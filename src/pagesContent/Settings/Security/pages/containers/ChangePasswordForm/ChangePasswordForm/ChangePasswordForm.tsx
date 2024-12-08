import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Form from '@useweb/ui/Form'
import TextField from '@useweb/ui/TextField'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import useSnackbar from '@useweb/ui/Snackbar'

import useChangePasswordForm from '../useChangePasswordForm/useChangePasswordForm.js'
import useSubmitChangePasswordForm from '../useSubmitChangePasswordForm/useSubmitChangePasswordForm.js'

export type ChangePasswordFormSchema = {
  name: string
}

export type ChangePasswordFormProps = {
  sx?: BoxProps['sx']
}

export default function ChangePasswordForm(props: ChangePasswordFormProps) {
  const snackbar = useSnackbar()
  const submitForm = useSubmitChangePasswordForm({
    onSuccess: () => {
      snackbar.show({
        message: 'Success',
      })
    },
  })

  return (
    <Form<ChangePasswordFormSchema>
      data-id='ChangePasswordForm'
      onSubmit={({ formValues }) => {
        console.log('formValues', formValues)
      }}
    >
      <ChangePasswordFormContent
        {...props}
        submissionError={submitForm.error}
        submitting={submitForm.loading}
      />
    </Form>
  )
}

type ChangePasswordFormContentProps = ChangePasswordFormProps & {
  submissionError: string | Error | null
  submitting: boolean
}

const ChangePasswordFormContent = (props: ChangePasswordFormContentProps) => {
  const formData = useChangePasswordForm()

  return (
    <Box
      data-id='ChangePasswordFormContent'
      sx={{
        display: 'grid',
        gap: 2,
      }}
    >
      <TextField<ChangePasswordFormSchema> name='name' label='name' />

      <ErrorMessage error={props.submissionError} message='Error' />
    </Box>
  )
}
