import path from 'path'

import assert from '@useweb/assert'

import type { CloneThisProjectContextSchema } from '../../CloneThisProjectContextSchema/CloneThisProjectContext.schema.js'
import getRootFoldersAndFiles from '../../../../../devtools/utils/node/getRootFoldersAndFiles/getRootFoldersAndFiles.js'
import copyFile from '../../../../../devtools/utils/node/copyFile/copyFile.js'

export type CloneThisProjectCloneProjectProps = {
  cloneThisProjectContext: CloneThisProjectContextSchema
}

export default async function cloneThisProjectCloneProject(
  props: CloneThisProjectCloneProjectProps,
) {
  assert<CloneThisProjectCloneProjectProps>({
    props,
    requiredProps: ['cloneThisProjectContext'],
  })

  const sourceDir = process.cwd()

  const { filesAndFolders } = await getRootFoldersAndFiles({
    dirPath: sourceDir,
  })

  await Promise.all(
    filesAndFolders.map(async (fileOrFolder) => {
      if (fileOrFolder.includes('node_modules')) {
        return
      }

      const fileOrFolderDir = path.join(sourceDir, fileOrFolder)
      const targetDir = path.join(
        props.cloneThisProjectContext.cloneProjectPath,
        fileOrFolder,
      )

      await copyFile({
        sourcePath: fileOrFolderDir,
        targetPath: targetDir,
        options: {
          filter: (src) => {
            if (src.includes('node_modules')) {
              return false
            }

            return true
          },
        },
      })
    }),
  )
}

export type CloneThisProjectCloneProjectReturn = ReturnType<
  typeof cloneThisProjectCloneProject
>
