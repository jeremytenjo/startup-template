import path from 'path'

import glob from '../../../../../devtools/utils/node/glob.js'
import log from '../../../../../devtools/utils/node/log.js'
import { ignoreCollections } from '../../../../../src/data/data.index.js'

import addFirestoreEmulatorDataRaw, {
  type CollectionType,
} from './addFirestoreEmulatorDataRaw/addFirestoreEmulatorData.raw.js'

/**
 * [Docs](https://firebase.google.com/docs/emulator-suite/connect_firestore)
 */
export default async function addFirestoreEmulatorData({ db }) {
  const collections: CollectionType[] = await getCollectionsData()

  try {
    await addFirestoreEmulatorDataRaw({
      db,
      collections,
    })
  } catch (error: any) {
    log(error, {
      error: true,
    })
  }
}

async function getCollectionsData() {
  const pattern = path.join(process.cwd(), 'src', 'data', '**', '*.stubs.ts')
  const stubsData = await glob({
    pattern,
  })

  const collections: CollectionType[] = await Promise.all(
    stubsData.map(async (stubPath) => {
      const [name] = stubPath.split('/').pop()?.split('.') || []

      const { default: data } = await import(stubPath)

      return {
        name,
        data,
      }
    }),
  )

  const removeignoreCollections = collections.filter(
    (collection) => !ignoreCollections.some((c) => c.name === collection.name),
  )

  return removeignoreCollections
}
