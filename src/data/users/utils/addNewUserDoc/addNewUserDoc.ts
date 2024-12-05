import assert from '@useweb/assert'
import { addUserToFirestore, getIsUsernameTaken } from '@useweb/firebase/useFirebaseAuth'
import { getToday } from '@useweb/date'

import type UserSchema from '../../user.schema.js'
import ph_userSignedUp from '../../../../lib/integrations/PostHog/events/browser/ph_userSignedUp/ph_userSignedUp.js'

export type AddNewUserDocProps = {
  uid: UserSchema['id']
  email: UserSchema['email']
  photoURL: UserSchema['photoURL'] | false
  bannerUrl: UserSchema['bannerUrl']
}

// add new user doc to firestore with default values
export default async function addNewUserDoc(props: AddNewUserDocProps) {
  assert<AddNewUserDocProps>({
    props,
    requiredProps: ['uid', 'email'],
  })

  // TODO generate username from email
  const username = 'usrename'

  await getIsUsernameTaken({ username })

  const newUserDoc: UserSchema = {
    id: props.uid,
    displayName: username,
    email: props.email,
    photoURL: props.photoURL || '',
    bannerUrl: props.bannerUrl || false,
    agreedToTOSandPrivacyPolicy: getToday(),
    lastSignedIn: getToday(),
  }

  await addUserToFirestore<UserSchema>({
    userData: newUserDoc,
  })

  try {
    await ph_userSignedUp({
      newUser: newUserDoc,
    })
  } catch (error) {
    console.error('ph_userSignedUp error', error)
  }

  return { newUserDoc }
}

export type AddNewUserDocReturn = ReturnType<typeof addNewUserDoc>
