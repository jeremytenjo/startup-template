import path from 'path'

import glob from '../../../../../devtools/utils/node/glob.js'
import collections, { ignoreCollections } from '../../../../data/data.index.js'

export default async function getCollections() {
  const pattern = path.join(process.cwd(), 'src', 'data', '**', '*.stubs.ts')
  const stubsData = await glob({
    pattern,
  })

  const missingCollections: string[] = []

  stubsData.map((stubPath) => {
    const [name] = stubPath.split('/').pop()?.split('.') || []

    const collectionsInDataIndex = collections.some((collection) => {
      return collection.name === name
    })

    const isInIgnoreFile = ignoreCollections.some((ignoreCollection) => {
      return ignoreCollection.name === name
    })

    if (!collectionsInDataIndex && !isInIgnoreFile) {
      missingCollections.push(name)
    }
  })

  if (missingCollections.length > 0) {
    throw new Error(
      `Missing collections in src/data/data.index.ts: ${missingCollections.join(', ')}`,
    )
  }

  return { collections }
}

export type GetCollectionsReturn = ReturnType<typeof getCollections>
