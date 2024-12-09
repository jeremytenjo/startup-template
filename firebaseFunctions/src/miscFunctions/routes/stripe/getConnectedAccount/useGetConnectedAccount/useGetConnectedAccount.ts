import useAuth from '../../../../../../../src/data/users/utils/useAuth/useAuth.js'
import useMiscFunctionsPersist from '../../../../utils/useMiscFunctionsPersist/useMiscFunctionsPersist.js'
import type { API_GetConnectedAccountProps } from '../getConnectedAccount.js'

export default function useGetConnectedAccount() {
  const auth = useAuth()
  const connectedAccount = useMiscFunctionsPersist<API_GetConnectedAccountProps>({
    currentUser: auth.user,
    id: auth.user?.stripeConnectedAccountId || undefined,
    api: {
      route: 'routes/getConnectedAccount',
      payload: {
        connectedAccountId: auth.user?.stripeConnectedAccountId || '',
      },
    },
  })

  return connectedAccount
}

export type UseGetConnectedAccountReturn = ReturnType<typeof useGetConnectedAccount>
