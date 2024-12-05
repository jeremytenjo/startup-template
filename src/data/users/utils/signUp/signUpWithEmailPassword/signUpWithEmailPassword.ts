import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import assert from '@useweb/assert'

import addNewUserDoc from '../../addNewUserDoc/addNewUserDoc.js'
import type { SignUpFormEmailPasswordDataSchema } from '../../useAuth/useAuth.js'

export type SignUpWithEmailPasswordProps = SignUpFormEmailPasswordDataSchema

export default async function signUpWithEmailPassword(
  props: SignUpWithEmailPasswordProps,
) {
  assert<SignUpWithEmailPasswordProps>({
    props,
    requiredProps: ['email', 'password'],
  })

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
    photoURL: props.photoUrl || false,
    bannerUrl: props.bannerUrl || false,
  })

  return createdAuthUser
}

export type SignUpWithEmailPasswordReturn = ReturnType<typeof signUpWithEmailPassword>

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
