import assert from '@useweb/assert'
import { doc, setDoc } from 'firebase/firestore'
import { getToday } from '@useweb/date'

import { usersCollectionName } from '../../../../../../../data/users/users.config.js'
import type UserSchema from '../../../../../../../data/users/user.schema.js'
import { db } from '../../../firebase.js'

export type UpdateFirestoreUserLastSignedInProps = { uid: string }

export default async function updateFirestoreUserLastSignedIn(
  props: UpdateFirestoreUserLastSignedInProps,
) {
  assert<UpdateFirestoreUserLastSignedInProps>({ props, requiredProps: ['uid'] })

  const updateRef = doc(db, usersCollectionName, props.uid)

  await setDoc(
    updateRef,
    {
      lastSignedIn: getToday(),
    } satisfies Partial<UserSchema>,
    { merge: true },
  )
}

export type UpdateFirestoreUserLastSignedInReturn = ReturnType<
  typeof updateFirestoreUserLastSignedIn
>
