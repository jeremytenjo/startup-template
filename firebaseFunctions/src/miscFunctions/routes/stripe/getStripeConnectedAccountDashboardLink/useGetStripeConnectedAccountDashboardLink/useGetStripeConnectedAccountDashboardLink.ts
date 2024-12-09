import useAuth from '../../../../../../../src/data/users/utils/useAuth/useAuth'
import useMiscFunctionsPersist from '../../../../utils/useMiscFunctionsPersist/useMiscFunctionsPersist'
import { API_GetStripeConnectedAccountDashboardLinkProps } from '../getStripeConnectedAccountDashboardLink'

export default function useGetStripeConnectedAccountDashboardLink() {
  const auth = useAuth()

  const stripeAccountDashboardLink =
    useMiscFunctionsPersist<API_GetStripeConnectedAccountDashboardLinkProps>({
      currentUser: auth.user,
      id: auth.user?.stripeConnectedAccountId || undefined,
      api: {
        route: 'routes/getStripeConnectedAccountDashboardLink',
        payload: {
          connectedAccountId: auth.user.stripeConnectedAccountId || '',
        },
      },
    })

  return stripeAccountDashboardLink
}

export type UseGetStripeConnectedAccountDashboardLinkReturn = ReturnType<
  typeof useGetStripeConnectedAccountDashboardLink
>
