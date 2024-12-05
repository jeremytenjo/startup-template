import { deleteUser, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {
  collection,
  where,
  type QueryConstraint,
  query,
  getDocs,
  limit,
} from 'firebase/firestore'

import type { SignUpFormGoogleDataSchema } from '../../useAuth/useAuth.js'
import type UserSchema from '../../../user.schema.js'
import { db } from '../../../../../lib/integrations/Google/Firebase/firebase.js'
import { usersCollectionName } from '../../../users.config.js'
import addNewUserDoc from '../../addNewUserDoc/addNewUserDoc.js'
import appConfig from '../../../../../../app.config.js'

const provider = new GoogleAuthProvider()

export type ContinueWithGoogleProps = {
  signUp?: SignUpFormGoogleDataSchema
}

export const noAccountErrorMessage = `User does not have a ${appConfig.siteInfo.name} Account`

export default async function continueWithGoogle(props: ContinueWithGoogleProps) {
  // https://firebase.google.com/docs/auth/web/google-signin
  const auth = getAuth()
  const authUser = await signInWithPopup(auth, provider)

  // Sign In with Google
  if (!props.signUp) {
    if (!authUser.user.email) {
      throw new Error(`authUser.user.email is undefined`, {
        cause: {
          authUser: authUser.user,
          props,
        },
      })
    }
    // check if user exists in firestore
    const hasUserRequestedGameBefore: UserSchema[] = []
    const constraints: QueryConstraint[] = []

    const coll = collection(db, usersCollectionName)

    constraints.push(
      where(
        'email' satisfies keyof UserSchema,
        '==',
        authUser.user.email satisfies UserSchema['email'],
      ),
    )
    constraints.push(
      where(
        'id' satisfies keyof UserSchema,
        '==',
        authUser.user.uid satisfies UserSchema['id'],
      ),
    )
    constraints.push(limit(1))

    const q = query(coll, ...constraints)

    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      hasUserRequestedGameBefore.push(doc.data() as UserSchema)
    })

    // user does not exist in firestore
    if (querySnapshot.empty) {
      // delete user from auth to prevent user in use error when trying to sign up again
      await deleteUser(authUser.user)
      throw new Error(noAccountErrorMessage, {
        cause: {
          props,
          authUser: authUser.user,
        },
      })
    }
  } else {
    // Sign Up with Google
    if (!authUser.user.email) {
      throw new Error(`authUser.user.email is undefined`, {
        cause: {
          authUser: authUser.user,
          props,
        },
      })
    }

    await addNewUserDoc({
      uid: authUser.user.uid,
      email: authUser.user.email,
      photoURL: props.signUp?.photoUrl || authUser.user.photoURL || false,
      bannerUrl: props.signUp?.bannerUrl || false,
    })
  }

  return { authUser }
}

export type ContinueWithGoogleReturn = ReturnType<typeof continueWithGoogle>
