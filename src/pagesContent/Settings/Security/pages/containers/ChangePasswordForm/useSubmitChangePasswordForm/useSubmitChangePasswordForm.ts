import useAsync from '@useweb/use-async'

import type { ChangePasswordFormSchema } from '../ChangePasswordForm/ChangePasswordForm.js'

import logError from '@/src/lib/utils/loggers/logError/logError'

export type UseSubmitChangePasswordFormProps = {
  onSuccess?: (props: { updates: Partial<any> }) => void
}

export default function useSubmitChangePasswordForm(
  props: UseSubmitChangePasswordFormProps,
) {
  const submitForm = useAsync<ChangePasswordFormSchema, any>({
    fn: async (p) => {
      // Add your form submission logic here
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
