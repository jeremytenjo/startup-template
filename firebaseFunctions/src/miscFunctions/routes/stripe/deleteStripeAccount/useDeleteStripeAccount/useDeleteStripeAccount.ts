import { refetchFirestoreUser } from '@useweb/firebase/useFirebaseAuth'
import useAuth from '../../../../../../../src/data/users/utils/useAuth/useAuth'
import { useMiscFunctionsClient } from '../../../../utils/useMiscFunctionsClient/useMiscFunctionsClient'
import { API_DeleteStripeAccountProps } from '../deleteStripeAccount'

export default function useDeleteStripeAccount() {
  const auth = useAuth()
  const deleteStripeAccount = useMiscFunctionsClient<API_DeleteStripeAccountProps>({
    api: {
      route: 'routes/deleteStripeAccount',
      payload: {
        connectedAccountId: auth.user?.stripeConnectedAccountId || '',
      },
    },
    options: {
      onResult: async () => {
        await refetchFirestoreUser()
      },
    },
  })

  return deleteStripeAccount
}

export type UseDeleteStripeAccountReturn = ReturnType<typeof useDeleteStripeAccount>
