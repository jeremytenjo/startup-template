import assert from '@useweb/assert'
import type { CallableRequest } from 'firebase-functions/v2/https'
import logger from 'firebase-functions/logger'

import getFirebaseAdminServer from '../../../../../../src/lib/integrations/Google/Firebase/admin/utils/getFirebaseAdminServer/getFirebaseAdmin.server.js'
import { usersCollectionName } from '../../../../../../src/data/users/users.config.js'
import type UserSchema from '../../../../../../src/data/users/user.schema.js'
import ph_userDeactivatedAccount from '../../../../../../src/lib/integrations/PostHog/events/node/ph_userDeactivatedAccount.ts/ph_userDeactivatedAccount.js'

export const routeId = 'routes/deactivateAccount'

export type API_DeactivateAccountProps = {
  route: typeof routeId
  authUser: CallableRequest['auth']
  payload: {
    uid: string
  }
  return: Awaited<DeactivateAccountReturn>
}

export type DeactivateAccountPropsInternal = Omit<
  API_DeactivateAccountProps,
  'route' | 'return'
>

export default async function deactivateAccount(
  props: DeactivateAccountPropsInternal,
): DeactivateAccountReturn {
  logger.info(`START: ${routeId}`, { props })

  assert<DeactivateAccountPropsInternal>({
    props,
    requiredProps: ['payload'],
  })
  assert<API_DeactivateAccountProps['payload']>({
    props: props.payload,
    requiredProps: ['uid'],
  })

  if (props.payload?.uid !== props.authUser?.uid) {
    throw new Error('User Id does not match Auth User Id')
  }

  const { firebaseAdmin } = getFirebaseAdminServer()

  // Delete Auth User
  await firebaseAdmin.auth().deleteUser(props.authUser.uid)

  // Delete User Doc
  const userDoc: UserSchema = await firebaseAdmin
    .firestore()
    .collection(usersCollectionName)
    .where('id' satisfies keyof UserSchema, '==', props.authUser.uid)
    .limit(1)
    .get()
    .then((doc) => {
      if (doc.empty) {
        throw new Error('User Doc not found')
      }

      return doc.docs[0].data() as UserSchema
    })

  await firebaseAdmin.firestore().collection(usersCollectionName).doc(userDoc.id).delete()

  ph_userDeactivatedAccount({
    uid: props.authUser.uid,
  })

  const response: Awaited<DeactivateAccountReturn> = {
    data: [
      {
        id: userDoc.id,
        success: true,
      },
    ],
  }

  logger.info(`END: ${routeId}`, { response })

  return response
}

export type DeactivateAccountReturn = Promise<{
  data: {
    id: string
    success: boolean
  }[]
}>
