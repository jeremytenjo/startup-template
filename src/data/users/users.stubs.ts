import { getToday } from '@useweb/date'

import appConfig from '../../../app.config.js'

import type UserSchema from './user.schema.js'

const commonProps: UserSchema = {
  id: '1',
  displayName: 'user1',
  email: 'user1@email.com',
  profilePhoto: {
    src: `http://localhost:${appConfig.nextjs.port}/images/placeholders/user1.jpg`,
  },
  bannerUrl: 'https://via.placeholder.com/150',
  agreedToTOSandPrivacyPolicy: getToday(),
  lastSignedIn: getToday(),
}

const userStubs: UserSchema[] = [
  {
    ...commonProps,
  },
]

export default userStubs
