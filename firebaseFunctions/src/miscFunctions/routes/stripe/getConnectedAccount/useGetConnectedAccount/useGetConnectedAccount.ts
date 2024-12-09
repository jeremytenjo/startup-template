import useAuth from '../../../../../../../src/data/users/utils/useAuth/useAuth'
import useMiscFunctionsPersist from '../../../../utils/useMiscFunctionsPersist/useMiscFunctionsPersist'
import { API_GetConnectedAccountProps } from '../getConnectedAccount'

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
