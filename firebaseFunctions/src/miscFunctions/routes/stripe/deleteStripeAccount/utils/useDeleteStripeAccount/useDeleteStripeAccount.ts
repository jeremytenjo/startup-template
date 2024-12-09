import useAsync from '@useweb/use-async'
import { updateUserData } from '@useweb/firebase/useFirebaseAuth'

import type { DeleteStripeAccountReturn } from '../../deleteStripeAccount.client.js'
import deleteStripeAccountClient from '../../deleteStripeAccount.client.js'
import type UserSchema from '../../../../../../../../src/data/users/user.schema.js'

export type UseDeleteStripeAccountProps = {
  user: UserSchema
}

export default function useDeleteStripeAccount(props: UseDeleteStripeAccountProps) {
  const deleteStripeAccount = useAsync<any, DeleteStripeAccountReturn>({
    fn: async () => {
      if (!props.user?.stripeConnectedAccountId) {
        throw new Error(
          `User ${props.user.id}:${props.user.displayName} does not have a stripeConnectedAccountId`,
        )
      }
      const res = await deleteStripeAccountClient({
        connectedAccountId: props.user.stripeConnectedAccountId,
      })

      if (res.data.stripeRes.deleted) {
        // remove stripeConnectedAccountId from user
        await updateUserData({
          uid: props.user.id,
          updatedData: {
            stripeConnectedAccountId: false,
          },
        })
      }

      return res.data
    },
  })

  return deleteStripeAccount
}

export type UseDeleteStripeAccountReturn = ReturnType<typeof useDeleteStripeAccount>
