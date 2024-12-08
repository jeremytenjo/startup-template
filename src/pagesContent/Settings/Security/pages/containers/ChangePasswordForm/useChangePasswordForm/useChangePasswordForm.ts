import { useFormContext } from '@useweb/ui/Form'
      
      import type { ChangePasswordFormSchema } from '../ChangePasswordForm/ChangePasswordForm.js'
      
      export type UseChangePasswordFormProps = any
      
      export default function useChangePasswordForm() {
        const formContext = useFormContext<ChangePasswordFormSchema>()
      
        return {
          formContext,
        }
      }
      
      export type UseChangePasswordFormReturn = ReturnType<
        typeof useChangePasswordForm
      >
      