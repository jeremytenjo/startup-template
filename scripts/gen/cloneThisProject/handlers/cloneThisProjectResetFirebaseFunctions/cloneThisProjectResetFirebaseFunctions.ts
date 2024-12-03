import path from 'path'

import assert from '@useweb/assert'

import type { CloneThisProjectContextSchema } from '../../CloneThisProjectContextSchema/CloneThisProjectContext.schema.js'
import getRootFoldersAndFiles from '../../../../../devtools/utils/node/getRootFoldersAndFiles/getRootFoldersAndFiles.js'
import removeFolder from '../../../../../devtools/utils/node/removeFolder.js'
import createFile from '../../../../../devtools/utils/node/createFile.js'

export type CloneThisProjectResetFirebaseFunctionsProps = {
  cloneThisProjectContext: CloneThisProjectContextSchema
}

export default async function cloneThisProjectResetFirebaseFunctions(
  props: CloneThisProjectResetFirebaseFunctionsProps,
) {
  assert<CloneThisProjectResetFirebaseFunctionsProps>({
    props,
    requiredProps: ['cloneThisProjectContext'],
  })

  const firebaseFunctionsSrcPath = path.join(
    props.cloneThisProjectContext.cloneProjectPath,
    'firebaseFunctions',
    'src',
  )

  const { filesAndFolders } = await getRootFoldersAndFiles({
    dirPath: firebaseFunctionsSrcPath,
  })

  // remove all folders expect utils
  await Promise.all(
    filesAndFolders
      .filter((folder: string) => folder !== 'utils')
      .map(async (folder: string) => {
        await removeFolder({
          folderPath: path.join(firebaseFunctionsSrcPath, folder),
        })
      }),
  )

  await createFile({
    filePath: path.join(firebaseFunctionsSrcPath, 'firebaseFunctions.ts'),
    fileContent: `import { onCall } from 'firebase-functions/v2/https'

export const helloWorld = onCall(
  async () => {
    return 'Hello from Firebase!'
  },
)
    `,
    noTimestamp: true,
  })
}

export type CloneThisProjectResetFirebaseFunctionsReturn = ReturnType<
  typeof cloneThisProjectResetFirebaseFunctions
>
