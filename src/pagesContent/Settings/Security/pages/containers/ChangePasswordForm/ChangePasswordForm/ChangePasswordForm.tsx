import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import Box from '@useweb/ui/Box'
import Form from '@useweb/ui/Form'
import Button from '@useweb/ui/Button'
import ActionBox from '@useweb/ui/ActionBox'
import TextField from '@useweb/ui/TextField'
import Skeleton from '@useweb/ui/Skeleton'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import Alert from '@useweb/ui/Alert'
import Text from '@useweb/ui/Text'
import useSnackbar from '@useweb/ui/Snackbar'

import useSubmitChangePasswordForm from '../useSubmitChangePasswordForm/useSubmitChangePasswordForm.js'
import useAuth from '../../../../../../../data/users/utils/useAuth/useAuth.js'
import { validatePassword } from '../../../../../../../data/users/utils/signUp/signUpFormUtils/signUpFormUtils.js'

export type ChangePasswordFormSchema = {
  newPassword: string
  confirmNewPassword: string
}

export type ChangePasswordFormProps = {
  sx?: BoxProps['sx']
}

const title = 'Change Password'
const subTitle = 'Change your password'

export default function ChangePasswordForm(props: ChangePasswordFormProps) {
  const auth = useAuth()
  const snackbar = useSnackbar()
  const submitForm = useSubmitChangePasswordForm({
    onSuccess: () => {
      snackbar.show({
        message: 'Password Changed',
      })
    },
  })

  if (!auth?.user?.id) {
    return (
      <ActionBox
        data-id='ChangePasswordFormLoading'
        headerProps={{
          title,
          subTitle,
        }}
        singleCTA
        ctas={
          <>
            <Button name='Save' disabled>
              Save
            </Button>
          </>
        }
        sx={{}}
      >
        <Skeleton count={4} loading>
          Skeleton
        </Skeleton>
      </ActionBox>
    )
  }

  const signInProvidersUsed = auth?.auth?.currentUser?.providerData
  const isUsingSignInWithGoogle =
    signInProvidersUsed?.length === 1 &&
    signInProvidersUsed?.[0]?.providerId === 'google.com'

  // prevent user from adding a password if they've only signed in with google
  const disableForm = isUsingSignInWithGoogle

  if (disableForm) {
    return (
      <ActionBox
        data-id='ChangePasswordFormGoogleAccount'
        headerProps={{
          title,
          subTitle,
        }}
        singleCTA
        ctas={
          <>
            <Button name='Save' disabled>
              Save
            </Button>
          </>
        }
        sx={{}}
      >
        <Alert severity='info'>
          <Text
            text={`You can’t change your password because you signed up with your google account.`}
            tag='p'
            sx={{}}
          />
        </Alert>
      </ActionBox>
    )
  }

  return (
    <Form<ChangePasswordFormSchema>
      data-id='ChangePasswordForm'
      onSubmit={({ formValues }) => {
        submitForm.exec(formValues)
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
  return (
    <ActionBox
      data-id='ChangePasswordFormContent'
      headerProps={{
        title,
        subTitle,
      }}
      singleCTA
      ctas={
        <>
          <Button name='Save' type='submit' sx={{}}>
            Save
          </Button>
        </>
      }
      sx={{}}
    >
      <Box
        data-id='ChangePasswordFormContent'
        sx={{
          display: 'grid',
          gap: 2,
        }}
      >
        <TextField<ChangePasswordFormSchema>
          name='newPassword'
          label='New Password'
          validate={(value) => {
            const res = validatePassword(value)
            return res.isValid ? true : res.message
          }}
        />
        <TextField<ChangePasswordFormSchema>
          name='confirmNewPassword'
          label='Confirm New Password'
          validate={(value, formValues) => {
            if (value !== formValues.newPassword) {
              return 'Passwords do not match'
            }
          }}
        />

        <ErrorMessage
          error={props.submissionError}
          message={
            String(props.submissionError).includes('auth/requires-recent-login')
              ? 'Sign out and sign back in to change your password.'
              : 'Error changing password.'
          }
        />
      </Box>
    </ActionBox>
  )
}
