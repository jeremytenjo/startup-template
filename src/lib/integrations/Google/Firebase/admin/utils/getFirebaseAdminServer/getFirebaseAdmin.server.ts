import admin from 'firebase-admin'

admin.initializeApp()

export default function getFirebaseAdminServer() {
  const firebaseAdmin = admin

  return { firebaseAdmin }
}

export type GetFirebaseAdminReturn = ReturnType<typeof getFirebaseAdminServer>
