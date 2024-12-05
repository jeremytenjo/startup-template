import useSnackbar from '@useweb/ui/Snackbar'
import { useRouter } from 'next/router'

export default function useOnSignUpActions() {
  const router = useRouter()
  const snackbar = useSnackbar()

  const onSignUp = () => {
    snackbar.show({
      message: 'Account created!',
      severity: 'success',
    })

    router.push('/')
  }

  return { onSignUp }
}

export type UseOnSignUpActionsReturn = ReturnType<typeof useOnSignUpActions>
