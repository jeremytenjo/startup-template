import useAuth from '../../../../../../../src/data/users/utils/useAuth/useAuth.js'
import useMiscFunctionsPersist from '../../../../utils/useMiscFunctionsPersist/useMiscFunctionsPersist.js'
import type { API_GetStripeBalanceProps } from '../getStripeBalance.js'

export default function useGetStripeBalance() {
  const auth = useAuth()

  const stripeBalance = useMiscFunctionsPersist<API_GetStripeBalanceProps>({
    currentUser: auth.user,
    id: auth.user?.stripeConnectedAccountId || undefined,
    api: {
      route: 'routes/getStripeBalance',
      payload: {
        connectedAccountId: auth.user?.stripeConnectedAccountId || '',
      },
    },
  })

  return stripeBalance
}

export type UseGetStripeBalanceReturn = ReturnType<typeof useGetStripeBalance>
