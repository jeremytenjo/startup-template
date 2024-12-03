import { onCall } from 'firebase-functions/v2/https'

export const helloWorld = onCall(async () => {
  return 'Hello from Firebase!'
})
