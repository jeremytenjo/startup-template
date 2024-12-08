import React from 'react'
import Box from '@useweb/ui/Box'
import Text from '@useweb/ui/Text'
import Avatar from '@useweb/ui/Avatar'
import FileInput from '@useweb/ui/FileInput'

import useEditProfileForm from '../../../useEditProfileForm/useEditProfileForm.js'
import type { EditProfileFormSchema } from '../../EditProfileForm.js'
import { Island } from '../../../../../../../theme/UiTheme/commonStyles/islandStyles.js'

export default function EditProfileFormHeaderField() {
  const formData = useEditProfileForm()

  return (
    <Island
      data-id='EditProfileFormHeaderField'
      sx={{
        backgroundColor: 'neutral.300',
        display: 'grid',
        gap: 2,
        justifyContent: 'space-between',
        gridAutoFlow: ['row', 'column'],
        alignItems: 'center',
      }}
    >
      <Box
        data-id='EditProfileFormHeaderFieldLeft'
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <Avatar
          src={
            formData.profilePhoto?.[0]?.file
              ? URL.createObjectURL(formData.profilePhoto?.[0]?.file)
              : formData.profilePhoto?.[0]?.src
          }
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
            fontSize: ['15px', '17px'],
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
  )
}
