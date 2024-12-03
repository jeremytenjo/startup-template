import useSnackbar from '@useweb/ui/Snackbar'
import useAsync from '@useweb/use-async'

import logError from '../../../../../utils/loggers/logError/logError.js'
import revokeYoutubeAccountAccessFn, {
  type RevokeYoutubeAccountAccessProps,
  type RevokeYoutubeAccountAccessReturn,
} from '../revokeYoutubeAccountAccess.js'

export default function useRevokeYoutubeAccountAccess() {
  const snackbar = useSnackbar()

  const revokeYoutubeAccountAccess = useAsync<
    RevokeYoutubeAccountAccessProps,
    Awaited<RevokeYoutubeAccountAccessReturn>
  >({
    fn: revokeYoutubeAccountAccessFn,
    onResult() {
      snackbar.show({
        title: `Youtube account unlinked successfully`,
        severity: 'success',
      })
    },
    onError({ error, fnProps }) {
      logError({
        error,
        fnName: 'useRevokeYoutubeAccountAccess',
        metadata: { fnProps },
      })
    },
  })

  return revokeYoutubeAccountAccess
}
