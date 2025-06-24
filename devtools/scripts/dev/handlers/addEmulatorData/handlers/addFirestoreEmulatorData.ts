import log from '../../../../../utils/node/log.js'

import addFirestoreEmulatorDataRaw from './addFirestoreEmulatorDataRaw/addFirestoreEmulatorData.raw.js'

/**
 * [Docs](https://firebase.google.com/docs/emulator-suite/connect_firestore)
 */
export default async function addFirestoreEmulatorData({ db }) {
  try {
    await addFirestoreEmulatorDataRaw({
      db,
    })
  } catch (error: any) {
    log(error, {
      error: true,
    })
  }
}
