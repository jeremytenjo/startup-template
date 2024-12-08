import admin from 'firebase-admin'

import firebaseConfig from '../../../../lib/integrations/Google/Firebase/firebase.config.js'
import firebaseJson from '../../../../../firebase.json' assert { type: 'json' }

process.env.FIRESTORE_EMULATOR_HOST = `127.0.0.1:${firebaseJson?.emulators.firestore.port}`
process.env.FIREBASE_AUTH_EMULATOR_HOST = `127.0.0.1:${firebaseJson?.emulators.auth.port}`

// use for testing and local development, does not import .js files
export default function getFirebaseAdminLocal() {
  if (admin.apps.length === 0) {
    admin.initializeApp(firebaseConfig)
  }

  const db = admin.firestore()
  const auth = admin.auth()

  return { db, auth, admin }
}

export type GetFirebaseAdminReturn = ReturnType<typeof getFirebaseAdminLocal>
