import assert from '@useweb/assert'
import { collection, query, where, getDocs, limit } from 'firebase/firestore'

import type UserSchema from '../../../../../../../data/users/user.schema.js'
import { usersCollectionName } from '../../../../../../../data/users/users.config.js'
import { db } from '../../../../Firebase/firebase.js'

export type GetIsUserVerifiedProps = { youtubeUsername: string }

export default async function getIsUserVerified(props: GetIsUserVerifiedProps) {
  assert({ props })

  let isUserVerified: UserSchema | false = false

  const q = query(
    collection(db, usersCollectionName),
    where('displayName', '==', props.youtubeUsername),
    where('verifiedCreator', '==', true),
    limit(1),
  )

  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc) => {
    isUserVerified = doc.data() as UserSchema
  })

  return { isUserVerified }
}

export type GetIsUserVerifiedReturn = ReturnType<typeof getIsUserVerified>
