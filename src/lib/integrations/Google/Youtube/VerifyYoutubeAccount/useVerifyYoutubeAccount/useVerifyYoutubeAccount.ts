import useSnackbar from '@useweb/ui/Snackbar'
import useAsync from '@useweb/use-async'

import logError from '../../../../../utils/loggers/logError/logError.js'
import verifyYoutubeAccountFn, {
  type VerifyYoutubeAccountProps,
  type VerifyYoutubeAccountReturn,
} from '../verifyYoutubeAccount.js'

export default function useVerifyYoutubeAccount() {
  const snackbar = useSnackbar()

  const verifyYoutubeAccount = useAsync<
    VerifyYoutubeAccountProps,
    Awaited<VerifyYoutubeAccountReturn>
  >({
    fn: verifyYoutubeAccountFn,
    onResult({ result }) {
      if (result) {
        snackbar.show({
          message: `${result.username} Youtube account verified successfully! You can edit your verification in the account page.`,
          severity: 'success',
        })
      }
    },
    onError({ error, fnProps }) {
      logError({
        error,
        fnName: 'useVerifyYoutubeAccount',
        metadata: { fnProps },
      })
    },
  })

  return verifyYoutubeAccount
}
