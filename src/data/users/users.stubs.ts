import { getToday } from '@useweb/date'

import type UserSchema from './user.schema.js'

const commonProps: UserSchema = {
  id: '1',
  displayName: 'User 1',
  email: 'user1@email.com',
  photoURL: 'https://via.placeholder.com/150',
  bannerUrl: 'https://via.placeholder.com/150',
  agreedToTOSandPrivacyPolicy: true,
  lastSignedIn: getToday(),
}

const userStubs: UserSchema[] = [
  {
    ...commonProps,
  },
]

export default userStubs
