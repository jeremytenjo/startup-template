import { firestoreConfig } from '../../../../../../../src/lib/integrations/Google/Firebase/firestore/firestore.config.js'

// DONT import any files other than node_modules in this file.
export type CollectionType = {
  name: string
  data: any[]
}

type AddFirestoreEmulatorDataRawProps = {
  db: any
}

/**
 * [Docs](https://firebase.google.com/docs/emulator-suite/connect_firestore)
 */
export default async function addFirestoreEmulatorDataRaw(
  props: AddFirestoreEmulatorDataRawProps,
) {
  const collections = firestoreConfig.collections
  const collectionsList = collections
    .map((c) => {
      return c.name
    })
    .join(', ')

  collections.map((collection: CollectionType) => {
    collection.data.map((collectionData) => {
      if (collection.name === 'users') {
        props.db.collection(collection.name).doc(collectionData.id).set(collectionData)
      } else {
        if (collectionData?.id) {
          props.db.collection(collection.name).doc(collectionData.id).set(collectionData)
        } else props.db.collection(collection.name).add(collectionData)
      }
    })
  })

  console.log(`Firestore emulator: Created collections ${collectionsList}`)
  console.log('')
}
