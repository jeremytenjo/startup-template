import assert from '@useweb/assert'

import userStubs from '../../data/users/users.stubs.js'
import addAuthEmulatorDataRaw from '../../../scripts/dev/handlers/addEmulatorData/handlers/addAuthEmulatorDataRaw/addAuthEmulatorData.raw.js'
import type UserSchema from '../../data/users/user.schema.js'
import addFirestoreEmulatorDataRaw from '../../../scripts/dev/handlers/addEmulatorData/handlers/addFirestoreEmulatorDataRaw/addFirestoreEmulatorData.raw.js'

import removeFirestoreEmulatorData from './handlers/removeFirestoreEmulatorData/removeFirestoreEmulatorData.js'
import removeAuthEmulatorData from './handlers/removeAuthEmulatorData/removeAuthEmulatorData.js'
import getFirebaseAdminLocal from './utils/getFirebaseAdminLocal/getFirebaseAdmin.local.js'
import getCollections from './handlers/getCollections/getCollections.js'

export type ResetFirebaseEmulatorDataProps = any

export type ResetFirebaseEmulatorDataReturn = {
  success: boolean
}

export default async function resetFirebaseEmulatorData(
  props: ResetFirebaseEmulatorDataProps = {},
): Promise<ResetFirebaseEmulatorDataReturn> {
  assert<ResetFirebaseEmulatorDataProps>({ props, requiredProps: [] })
  const collections = (await getCollections()).collections

  await removeFirestoreEmulatorData()
  await removeAuthEmulatorData()

  const admin = getFirebaseAdminLocal()

  await addAuthEmulatorDataRaw<UserSchema>({
    auth: admin.auth,
    users: userStubs,
  })

  await addFirestoreEmulatorDataRaw({
    db: admin.db,
    collections,
  })

  return {
    success: true,
  }
}
