import { useFormContext } from '@useweb/ui/Form'

import type { EditProfileFormSchema } from '../EditProfileForm/EditProfileForm.js'

export type UseEditProfileFormProps = any

export default function useEditProfileForm() {
  const formContext = useFormContext<EditProfileFormSchema>()
  const profilePhoto = formContext.watch('profilePhoto')
  const displayName = formContext.watch('displayName')

  return {
    formContext,
    profilePhoto,
    displayName,
  }
}

export type UseEditProfileFormReturn = ReturnType<typeof useEditProfileForm>
