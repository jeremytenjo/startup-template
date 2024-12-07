import assert from '@useweb/assert'
import { updateUserData } from '@useweb/firebase/useFirebaseAuth'
import { revokeGoogleAccountAccess } from '@useweb/google-identity-service'

import type UserSchema from '../../../../../data/users/user.schema.js'

export type RevokeYoutubeAccountAccessProps = {
  user: UserSchema
  preventRefetchFirestoreUser?: boolean
}

export default async function revokeYoutubeAccountAccess(
  props: RevokeYoutubeAccountAccessProps,
) {
  assert({ props, requiredProps: ['user'] })

  if (!props.user) {
    throw new Error('user is not signed in')
  }

  const googleAccessToken = ''

  if (googleAccessToken) {
    await revokeGoogleAccountAccess({
      accessToken: googleAccessToken,
    })
  } else {
    throw new Error('userPrivateData.googleAccessToken undefined')
  }

  if (googleAccessToken) {
    await updateUserData({
      uid: props.user.id,
      updatedData: {},
      preventRefetchFirestoreUser: props.preventRefetchFirestoreUser,
    })
  } else {
    throw new Error('getPrivateUserData did not return a google access token')
  }
}

export type RevokeYoutubeAccountAccessReturn = ReturnType<
  typeof revokeYoutubeAccountAccess
>
