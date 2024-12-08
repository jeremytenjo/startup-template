import useAsync from '@useweb/use-async'
import { getAuth, updatePassword } from 'firebase/auth'

import type { ChangePasswordFormSchema } from '../ChangePasswordForm/ChangePasswordForm.js'
import { validatePassword } from '../../../../../../../data/users/utils/signUp/signUpFormUtils/signUpFormUtils.js'

import logError from '@/src/lib/utils/loggers/logError/logError'

export type UseSubmitChangePasswordFormProps = {
  onSuccess?: () => void
}

export default function useSubmitChangePasswordForm(
  props: UseSubmitChangePasswordFormProps,
) {
  const submitForm = useAsync<ChangePasswordFormSchema, any>({
    fn: async (p) => {
      if (p.newPassword !== p.confirmNewPassword) {
        throw new Error('Passwords do not match')
      }

      const isValid = validatePassword(p.newPassword)

      if (!isValid.isValid) {
        throw new Error(isValid.message)
      }

      const auth = getAuth()
      const user = auth.currentUser

      if (user) {
        await updatePassword(user, p.newPassword)
        props.onSuccess?.()
      } else {
        throw new Error('ChangePasswordForm: user is undefined')
      }
    },

    onError({ error, fnProps }) {
      logError({
        error,
        fnName: 'useSubmitChangePasswordForm',
        metadata: { fnProps },
      })
    },
  })

  return submitForm
}

export type UseSubmitChangePasswordFormReturn = ReturnType<
  typeof useSubmitChangePasswordForm
>
