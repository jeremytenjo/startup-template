import assert from '@useweb/assert'
import { addUserToFirestore } from '@useweb/firebase/useFirebaseAuth'
import { getToday } from '@useweb/date'

import type UserSchema from '../../user.schema.js'
import ph_userSignedUp from '../../../../lib/integrations/PostHog/events/browser/ph_userSignedUp/ph_userSignedUp.js'

export type AddNewUserDocProps = {
  uid: UserSchema['id']
  email: UserSchema['email']
  profilePhoto: UserSchema['profilePhoto']
  username: UserSchema['displayName']
}

// add new user doc to firestore with default values
export default async function addNewUserDoc(props: AddNewUserDocProps) {
  assert<AddNewUserDocProps>({
    props,
    requiredProps: ['uid', 'email', 'username'],
  })

  const newUserDoc: UserSchema = {
    id: props.uid,
    displayName: props.username,
    email: props.email,
    profilePhoto: { src: props.profilePhoto?.src || '', type: 'image' },
    bannerUrl: { src: '', type: 'image' },
    agreedToTOSandPrivacyPolicy: getToday(),
    lastSignedIn: getToday(),
    stripeConnectedAccountId: false,
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
