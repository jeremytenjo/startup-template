import type { CollectionType } from '../../scripts/dev/handlers/addEmulatorData/handlers/addFirestoreEmulatorDataRaw/addFirestoreEmulatorData.raw.js'

import userStubs from './users/users.stubs.js'
import NotificationsStubs from './notifications/notifications.stubs.js'
import navLinksStubs from './_commonSchemas/NavLinkSchema/navLinks.stubs.js'
import socialLinksStubs from './_commonSchemas/SocialLinkSchema/socialLinks.stubs.js'

// this files is used to seed emulator firestore data
const dataIndex: CollectionType[] = [
  {
    name: 'users',
    data: userStubs,
  },
  {
    name: 'notifications',
    data: NotificationsStubs,
  },
  {
    name: 'navLinks',
    data: navLinksStubs,
  },
  {
    name: 'socialLinks',
    data: socialLinksStubs,
  },
]

export default dataIndex

// use when you add a collection stubs but the data is coming from supabase
export const ignoreCollections: { name: string }[] = []
