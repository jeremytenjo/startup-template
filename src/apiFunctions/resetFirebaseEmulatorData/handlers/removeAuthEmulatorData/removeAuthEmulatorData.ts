import firebaseConfig from '../../../../lib/integrations/Google/Firebase/firebase.config.js'
import firebaseJson from '../../../../../firebase.json' assert { type: 'json' }

export default async function removeAuthEmulatorData() {
  const authEmulatorUrl = `http://127.0.0.1:${firebaseJson.emulators.auth.port}/emulator/v1/projects/${firebaseConfig.projectId}/accounts`

  await fetch(authEmulatorUrl, {
    method: 'delete',
  })
}

export type RemoveAuthEmulatorDataReturn = ReturnType<typeof removeAuthEmulatorData>
