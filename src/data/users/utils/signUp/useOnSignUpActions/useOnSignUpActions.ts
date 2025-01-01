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

    if (router.query.redirect) {
      const rawRedirect = router.query.redirect as string
      const redirect = rawRedirect.charAt(0) !== '/' ? `/${rawRedirect}` : rawRedirect
      router.push(redirect)
      return
    }

    router.push('/')
  }

  return { onSignUp }
}

export type UseOnSignUpActionsReturn = ReturnType<typeof useOnSignUpActions>
