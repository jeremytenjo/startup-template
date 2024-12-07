import useAsync from '@useweb/use-async'
import { updateUserData } from '@useweb/firebase/useFirebaseAuth'

import type { EditProfileFormSchema } from '../EditProfileForm/EditProfileForm.js'
import type UserSchema from '../../../user.schema.js'
import uploadProfilePhoto from '../EditProfileForm/handlers/uploadProfilePhoto/uploadProfilePhoto.js'
import logError from '../../../../../lib/utils/loggers/logError/logError.js'
import useAuth from '../../../utils/useAuth/useAuth.js'

export type UseSubmitEditProfileFormProps = {
  onSuccess?: (props: { updates: Partial<UserSchema> }) => void
}

export default function useSubmitEditProfileForm(props: UseSubmitEditProfileFormProps) {
  const auth = useAuth()

  const submitForm = useAsync<EditProfileFormSchema, any>({
    fn: async (p) => {
      const updates: Partial<UserSchema> = {}

      if (p.profilePhoto[0].file) {
        const { downloadUrl } = await uploadProfilePhoto({
          file: p.profilePhoto[0].file,
          fileName: p.profilePhoto[0].file.name,
          displayName: p.displayName,
        })

        updates.profilePhoto = { src: downloadUrl, type: 'image' }
      }

      await updateUserData<UserSchema>({
        uid: auth.user?.id,
        updatedData: updates,
      })

      props.onSuccess?.({ updates })
    },

    onError({ error, fnProps }) {
      logError({
        error,
        fnName: 'useSubmitEditProfileForm',
        metadata: { fnProps },
      })
    },
  })

  return submitForm
}

export type UseSubmitEditProfileFormReturn = ReturnType<typeof useSubmitEditProfileForm>
