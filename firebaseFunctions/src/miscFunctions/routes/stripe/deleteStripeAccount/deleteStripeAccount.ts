import assert from '@useweb/assert'
import type { CallableRequest } from 'firebase-functions/v2/https'
import logger from 'firebase-functions/logger'
import type Stripe from 'stripe'

import getStripe from '../../../../../../src/lib/integrations/Stripe/utils/getStripe/getStripe.js'
import getFirebaseAdminServer from '../../../../../../src/lib/integrations/Google/Firebase/admin/utils/getFirebaseAdminServer/getFirebaseAdmin.server.js'
import { usersCollectionName } from '../../../../../../src/data/users/users.config.js'
import type UserSchema from '../../../../../../src/data/users/user.schema.js'

export const routeId = 'routes/deleteStripeAccount'

export type API_DeleteStripeAccountProps = {
  route: typeof routeId
  authUser: CallableRequest['auth']
  payload: {
    connectedAccountId: string
  }
  return: Awaited<DeleteStripeAccountReturn>
}

export type DeleteStripeAccountPropsInternal = Omit<
  API_DeleteStripeAccountProps,
  'route' | 'return'
>

export default async function deleteStripeAccount(
  props: DeleteStripeAccountPropsInternal,
): DeleteStripeAccountReturn {
  logger.info(`START: ${routeId}`, { props })

  assert<DeleteStripeAccountPropsInternal>({
    props,
    requiredProps: ['payload'],
  })
  assert<API_DeleteStripeAccountProps['payload']>({
    props: props.payload,
    requiredProps: ['connectedAccountId'],
  })

  if (!props.authUser?.uid) {
    throw new Error(`props.authUser?.uid is undefined`, { cause: {} })
  }

  const { stripe } = getStripe()

  const stripeRes = await stripe.accounts.del(props.payload.connectedAccountId)

  const { firebaseAdmin } = getFirebaseAdminServer()

  await firebaseAdmin
    .firestore()
    .collection(usersCollectionName)
    .doc(props.authUser.uid)
    .update({
      stripeConnectedAccountId: false,
    } satisfies Partial<UserSchema>)

  const response: Awaited<DeleteStripeAccountReturn> = {
    data: [
      {
        id: stripeRes.id,
        stripeRes,
      },
    ],
  }

  logger.info(`END: ${routeId}`, { response })

  return response
}

export type DeleteStripeAccountReturn = Promise<{
  data: {
    id: string
    stripeRes: Stripe.Response<Stripe.DeletedAccount>
  }[]
}>
