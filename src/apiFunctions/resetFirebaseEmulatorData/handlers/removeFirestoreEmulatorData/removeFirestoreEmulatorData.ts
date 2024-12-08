import firebaseConfig from '../../../../lib/integrations/Google/Firebase/firebase.config.js'
import firebaseJson from '../../../../../firebase.json' assert { type: 'json' }

export default async function removeFirestoreEmulatorData() {
  const firestoreEmulatorUrl = `http://127.0.0.1:${firebaseJson.emulators.firestore.port}/emulator/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`

  await fetch(firestoreEmulatorUrl, {
    method: 'delete',
  })
}

export type RemoveFirestoreEmulatorDataReturn = ReturnType<
  typeof removeFirestoreEmulatorData
>
