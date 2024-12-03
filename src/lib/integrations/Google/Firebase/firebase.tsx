import React from 'react'
import { FirebaseProvider } from '@useweb/firebase/useFirebase'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { connectFirestoreEmulator } from 'firebase/firestore'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'
// import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check'

import firebaseJson from '../../../../../firebase.json'

import firebaseConfig from './firebase.config.js'

const enableFirebase = Boolean(firebaseConfig.projectId)

const firebaseApp = enableFirebase ? initializeApp(firebaseConfig) : (null as any)

export const db = enableFirebase ? getFirestore(firebaseApp) : (null as any)
export const auth = enableFirebase ? getAuth(firebaseApp) : (null as any)
export const storage = enableFirebase ? getStorage(firebaseApp) : (null as any)
export const functions = enableFirebase ? getFunctions(firebaseApp) : (null as any)

const envIsDev = process.env.NODE_ENV === 'development'

if (enableFirebase && envIsDev) {
  connectFirestoreEmulator(db, 'localhost', firebaseJson.emulators.firestore.port)
  connectAuthEmulator(auth, `http://localhost:${firebaseJson.emulators.auth.port}`)
  connectStorageEmulator(storage, 'localhost', firebaseJson.emulators.storage.port)
  connectFunctionsEmulator(functions, 'localhost', firebaseJson.emulators.functions.port)
}

export default function Firebase({ children }) {
  // React.useEffect(() => {
  //   if (!envIsDev) {
  //     initializeAppCheck(firebaseApp, {
  //       provider: new ReCaptchaEnterpriseProvider(firebaseReCaptchaEnterpriseSiteKey),
  //       isTokenAutoRefreshEnabled: true,
  //     })
  //   }
  // }, [])

  if (!enableFirebase) {
    return children
  }

  return (
    <FirebaseProvider
      firebaseConfig={firebaseConfig}
      firebaseApp={firebaseApp}
      envIsDev={envIsDev}
      db={db}
      dbOptions={{
        disableEmulatorConnection: true,
      }}
    >
      {children}
    </FirebaseProvider>
  )
}
