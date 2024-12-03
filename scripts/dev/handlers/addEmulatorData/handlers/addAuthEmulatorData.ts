import usersStubs from '../../../../../src/data/users/users.stubs.js'
import log from '../../../../../devtools/utils/node/log.js'
import type UserSchema from '../../../../../src/data/users/user.schema.js'

import addAuthEmulatorDataRaw from './addAuthEmulatorDataRaw/addAuthEmulatorData.raw.js'

/**
 * [Docs](https://firebase.google.com/docs/emulator-suite/connect_auth)
 */
export default async function addAuthEmulatorData({ auth }) {
  try {
    await addAuthEmulatorDataRaw<UserSchema>({
      auth,
      users: usersStubs,
    })
  } catch (error: any) {
    log(error, {
      error: true,
    })
  }
}
