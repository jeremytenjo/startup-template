import React from 'react'
import Form from '@useweb/ui/Form'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import Button from '@useweb/ui/Button'
import ActionBox from '@useweb/ui/ActionBox'
import useSnackbar from '@useweb/ui/Snackbar'
import Skeleton from '@useweb/ui/Skeleton'

import type UserSchema from '../../../user.schema.js'
import useAuth from '../../../utils/useAuth/useAuth.js'
import useSubmitEditProfileForm from '../useSubmitEditProfileForm/useSubmitEditProfileForm.js'

import EditProfileFormHeaderField from './containers/EditProfileFormHeaderField/EditProfileFormHeaderField.js'

export type EditProfileFormSchema = {
  profilePhoto: UserSchema['profilePhoto'][]
  displayName: UserSchema['displayName']
}

export type EditProfileFormProps = any

const title = 'Personal Information'
const subTitle = 'Update your personal information'

export default function EditProfileForm(props: EditProfileFormProps) {
  const auth = useAuth()
  const snackbar = useSnackbar()
  const submitForm = useSubmitEditProfileForm({
    onSuccess: () => {
      snackbar.show({
        message: 'Profile Updated',
      })
    },
  })

  if (!auth.user) {
    return (
      <ActionBox
        data-id='EditProfileFormLoading'
        headerProps={{
          title,
          subTitle,
        }}
        ctas={
          <>
            <Button name='Save' disabled sx={{}}>
              Save
            </Button>
          </>
        }
        singleCTA
        sx={{}}
      >
        <Skeleton loading count={4}>
          Skeleton
        </Skeleton>
      </ActionBox>
    )
  }

  return (
    <Form<EditProfileFormSchema>
      data-id='EditProfileForm'
      onSubmit={({ formValues }) => {
        submitForm.exec(formValues)
      }}
      defaultValues={{
        profilePhoto: [{ ...auth.user.profilePhoto, type: 'image' }],
        displayName: auth.user.displayName,
      }}
    >
      <EditProfileFormContent
        {...props}
        submissionError={submitForm.error}
        submitting={submitForm.loading}
      />
    </Form>
  )
}

type EditProfileFormContentProps = EditProfileFormProps & {
  submissionError: string | Error | null
  submitting: boolean
}

const EditProfileFormContent = (props: EditProfileFormContentProps) => {
  return (
    <ActionBox
      data-id='EditProfileFormContent'
      headerProps={{
        title,
        subTitle,
      }}
      singleCTA
      ctas={
        <>
          <Button name='Save' type='submit' loading={props.submitting} sx={{}}>
            Save
          </Button>
        </>
      }
      sx={{}}
      childrenSx={{
        display: 'grid',
        gap: 2,
      }}
    >
      <EditProfileFormHeaderField />
      <ErrorMessage error={props.submissionError} message='Error Saving changes' />
    </ActionBox>
  )
}
