import useAsync from '@useweb/use-async'
import useSnackbar from '@useweb/ui/Snackbar'

import resetPasswordFormFn, { type ResetPasswordFormProps } from '../resetPasswordForm.js'

export type UseResetPasswordForm = {
  onSuccess: () => void
}

export default function useResetPasswordForm(props: UseResetPasswordForm) {
  const snackbar = useSnackbar()

  const resetPasswordForm = useAsync<ResetPasswordFormProps, any>({
    fn: resetPasswordFormFn,
    onResult: () => {
      snackbar.show({
        message: 'Password reset email sent',
        severity: 'success',
      })

      props.onSuccess()
    },
  })

  return resetPasswordForm
}
