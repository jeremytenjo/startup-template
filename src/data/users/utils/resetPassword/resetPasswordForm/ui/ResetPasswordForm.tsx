import React from 'react'
import Form from '@useweb/ui/Form'
import TextField from '@useweb/ui/TextField'
import Text from '@useweb/ui/Text'
import ErrorMessage from '@useweb/ui/ErrorMessage'

import type { UseResetPasswordForm } from '../useResetPasswordForm/useResetPassword.js'
import useResetPasswordForm from '../useResetPasswordForm/useResetPassword.js'
import AccountAccessCta from '../../../../ui/AccountAccessCTA/AccountAccessCta.js'

export type ResetPasswordFormProps = {
  onSuccess: UseResetPasswordForm['onSuccess']
}

export default function ResetPasswordForm(props: ResetPasswordFormProps) {
  const resetPasswordForm = useResetPasswordForm({
    onSuccess: props.onSuccess,
  })

  return (
    <Form<any>
      data-id='ResetPasswordForm'
      sx={{
        display: 'grid',
        alignContent: 'start',
        width: '100%',
        gridAutoFlow: 'row',
        gridGap: '20px',
        justifyItems: 'center',
      }}
      onSubmit={({ formValues }) => {
        resetPasswordForm.exec(formValues)
      }}
    >
      <TextField
        label='Email'
        name='email'
        hint='Enter email you used to sign up'
        type='email'
        placeholder='Email'
        required='Email is required'
        sx={{
          width: '100%',
        }}
      />

      <AccountAccessCta
        loading={false}
        text='Send email'
        buttonProps={{
          variant: 'green',
        }}
      />

      {resetPasswordForm.result && !resetPasswordForm.error && (
        <Text text={`Password reset email sent`} sx={{}} />
      )}

      {resetPasswordForm.error && (
        <ErrorMessage
          error={resetPasswordForm.error}
          message={'Error resetting password, please refresh the page and try again.'}
        />
      )}
    </Form>
  )
}
