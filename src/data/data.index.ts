import type { CollectionType } from '../../scripts/dev/handlers/addEmulatorData/handlers/addFirestoreEmulatorDataRaw/addFirestoreEmulatorData.raw.js'

import userStubs from './users/users.stubs.js'

// this files is used to seed emulator firestore data
const dataIndex: CollectionType[] = [
  {
    name: 'users',
    data: userStubs,
  },
]

export default dataIndex

// use when you add a collection stubs but the data is coming from supabase
export const ignoreCollections = []
