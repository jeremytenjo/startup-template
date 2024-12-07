import React from 'react'
import Form from '@useweb/ui/Form'
import Text from '@useweb/ui/Text'
import ErrorMessage from '@useweb/ui/ErrorMessage'
import Box from '@useweb/ui/Box'
import Button from '@useweb/ui/Button'
import ActionBox from '@useweb/ui/ActionBox'
import FileInput from '@useweb/ui/FileInput'
import Avatar from '@useweb/ui/Avatar'

import useEditProfileForm from '../useEditProfileForm/useEditProfileForm.js'
import type UserSchema from '../../../user.schema.js'
import useAuth from '../../../utils/useAuth/useAuth.js'
import { Island } from '../../../../../theme/UiTheme/commonStyles/islandStyles.js'

export type EditProfileFormSchema = {
  profilePhoto: UserSchema['profilePhoto']
  displayName: UserSchema['displayName']
}

export type EditProfileFormProps = any

export default function EditProfileForm(props: EditProfileFormProps) {
  const auth = useAuth()

  if (!auth.user) {
    return null
  }

  return (
    <Form<EditProfileFormSchema>
      data-id='EditProfileForm'
      onSubmit={({ formValues }) => {
        console.log('formValues', formValues)
      }}
      defaultValues={{
        profilePhoto: auth.user.profilePhoto,
        displayName: auth.user.displayName,
      }}
    >
      <EditProfileFormContent {...props} submissionError={null} submitting={false} />
    </Form>
  )
}

type EditProfileFormContentProps = EditProfileFormProps & {
  submissionError: string | Error | null
  submitting: boolean
}

const EditProfileFormContent = (props: EditProfileFormContentProps) => {
  const formData = useEditProfileForm()

  return (
    <ActionBox
      data-id='EditProfileFormContent'
      headerProps={{
        title: 'Personal Information',
        subTitle: 'Update your personal information',
      }}
      ctas={
        <>
          <Button name='Save' type='submit' sx={{}}>
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
      <Island
        data-id='EditProfileFormContentProfilePhoto'
        sx={{
          backgroundColor: 'neutral.300',
          display: 'grid',
          gap: 2,
          justifyContent: 'space-between',
          gridAutoFlow: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          data-id='EditProfileFormContentProfilePhotoLeft'
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Avatar
            src={formData.profilePhoto?.[0]?.src}
            alt={'photo'}
            sx={{
              width: '80px',
              height: '80px',
            }}
          />

          <Text
            text={formData.displayName}
            tag='p'
            sx={{
              fontSize: '20px',
              fontWeight: '600',
            }}
          />
        </Box>

        <FileInput<EditProfileFormSchema>
          name='profilePhoto'
          label='Change Photo'
          hidePreviews
          isRequired
          inputProps={{
            accept: '.png, .jpg, .jpeg, .webp',
          }}
          sx={{
            '& [data-id="FileInput_Button"]': {
              backgroundColor: 'neutral.100',
            },
          }}
        />
      </Island>

      <ErrorMessage error={props.submissionError} message='Error' />
    </ActionBox>
  )
}
