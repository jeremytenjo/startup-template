import fetch from 'cross-fetch'

export default async function resetFirebaseEmulatorDataClientFetch() {
  return (await (
    await fetch('http://localhost:3001/api/firebase/emulators/resetFirebaseEmulatorData')
  ).json()) as {
    error?: string
  }
}
