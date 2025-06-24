import path from 'path'

import glob from '../../../../../utils/node/glob.js'
import createFile from '../../../../../utils/node/createFile.js'
import type { PayloadTypes } from '../../startStorybook.js'

export default async function generateStoriesList(payload: PayloadTypes) {
  const storiesWithFullPaths = await glob({
    pattern: `${process.cwd()}/src/**/stories/*stories.@(tsx|ts)`,
    options: {
      ignore: '**/node_modules/**',
    },
  })

  const stories = storiesWithFullPaths.map((storyFullPath) => {
    return storyFullPath.replace(process.cwd(), '../..')
  })

  const storiesListPath = path.join(payload.storybookPath, 'storiesList.cjs')
  const storiesListContent = `module.exports = ${JSON.stringify(stories)}`

  await createFile({
    filePath: storiesListPath,
    fileContent: storiesListContent,
    overwrite: true,
  })
}
