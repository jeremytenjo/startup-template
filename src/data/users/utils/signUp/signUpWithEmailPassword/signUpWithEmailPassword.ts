import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from 'firebase/firestore'
import assert from '@useweb/assert'

import addNewUserDoc from '../../addNewUserDoc/addNewUserDoc.js'
import { usersCollectionName } from '../../../users.config.js'
import type { SignUpFormEmailPasswordDataSchema } from '../../useAuth/useAuth.js'
import type UserSchema from '../../../user.schema.js'

export type SignUpWithEmailPasswordProps = SignUpFormEmailPasswordDataSchema

export default async function signUpWithEmailPassword(
  props: SignUpWithEmailPasswordProps,
) {
  assert<SignUpWithEmailPasswordProps>({
    props,
    requiredProps: ['username', 'email', 'password'],
  })

  if (!props.agreedToTOSandPrivacyPolicy) {
    throw new Error(`agreedToTOSandPrivacyPolicy is undefined`)
  }

  await getIsUsernameTaken({ username: props.username })

  // create auth user
  const auth = getAuth()

  const createdAuthUser = await createUserWithEmailAndPassword(
    auth,
    props.email,
    props.password,
  )

  await addNewUserDoc({
    uid: createdAuthUser.user.uid,
    email: props.email,
    username: props.username,
    photoURL: props.photoUrl || false,
    bannerUrl: props.bannerUrl || false,
    agreedToTOSandPrivacyPolicy: props.agreedToTOSandPrivacyPolicy,
  })

  return createdAuthUser
}

export type SignUpWithEmailPasswordReturn = ReturnType<typeof signUpWithEmailPassword>

export const getIsUsernameTaken = async ({ username }) => {
  if (!username) {
    throw new Error(`username is undefined`, { cause: {} })
  }

  const db = getFirestore()
  const usersRef = collection(db, usersCollectionName)
  const userQuery = query(
    usersRef,
    where('displayName' satisfies keyof UserSchema, '==', username),
    limit(1),
  )
  const querySnapshot = await getDocs(userQuery)
  const usernameTaken = !querySnapshot.empty

  if (usernameTaken) {
    throw new Error('Username taken, please try a different one.', {
      cause: { username },
    })
  }
}

export const usernameErrorMessage =
  'Username must be 4 to 40 characters long and only use letters, numbers, underscores, and periods.'

export const validateUsername = ({ value, supressError = false }) => {
  const usernameRegex = /^[A-Za-z][A-Za-z0-9_.]{4,40}$/
  const isValid = usernameRegex.test(value)

  if (!isValid && !supressError) {
    throw new Error(usernameErrorMessage)
  }
  return isValid
}

export const validateEmail = ({ value, supressError = false }) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  const isValid = emailRegex.test(value)
  if (!isValid && !supressError) {
    throw new Error(emailErrorMessage)
  }
  return isValid
}

export const emailErrorMessage = 'Invalid email address'
