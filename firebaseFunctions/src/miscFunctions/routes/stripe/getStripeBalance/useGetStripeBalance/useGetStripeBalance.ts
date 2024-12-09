import useAuth from '../../../../../../../src/data/users/utils/useAuth/useAuth'
import useMiscFunctionsPersist from '../../../../utils/useMiscFunctionsPersist/useMiscFunctionsPersist'
import { API_GetStripeBalanceProps } from '../getStripeBalance'

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
