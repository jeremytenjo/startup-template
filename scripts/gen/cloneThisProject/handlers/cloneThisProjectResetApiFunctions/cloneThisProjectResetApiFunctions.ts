import path from 'path'

import assert from '@useweb/assert'

import type { CloneThisProjectContextSchema } from '../../CloneThisProjectContextSchema/CloneThisProjectContext.schema.js'
import removeFolder from '../../../../../devtools/utils/node/removeFolder.js'
import createFile from '../../../../../devtools/utils/node/createFile.js'

export type CloneThisProjectResetApiFunctionsProps = {
  cloneThisProjectContext: CloneThisProjectContextSchema
}

export default async function cloneThisProjectResetApiFunctions(
  props: CloneThisProjectResetApiFunctionsProps,
) {
  assert<CloneThisProjectResetApiFunctionsProps>({
    props,
    requiredProps: ['cloneThisProjectContext'],
  })

  const apiFunctionsPath = path.join(
    props.cloneThisProjectContext.cloneProjectPath,
    'src',
    'apiFunctions',
  )

  await removeFolder({
    folderPath: apiFunctionsPath,
  })

  await createFile({
    noTimestamp: true,
    nojs: true,
    filePath: path.join(apiFunctionsPath, 'readme.md'),
    fileContent: `# Api Functions

This folder contains all the api functions for the project.

    `,
  })
}

export type CloneThisProjectResetApiFunctionsReturn = ReturnType<
  typeof cloneThisProjectResetApiFunctions
>
