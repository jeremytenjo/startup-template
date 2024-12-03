import assert from '@useweb/assert'

import moveFiles from '../../../../../devtools/utils/node/moveFiles/moveFiles.js'
import type { CloneThisProjectContextSchema } from '../../CloneThisProjectContextSchema/CloneThisProjectContext.schema.js'
import removeFolder from '../../../../../devtools/utils/node/removeFolder.js'

export type CloneThisProjectMoveTempFolderProps = {
  cloneThisProjectContext: CloneThisProjectContextSchema
}

export default async function cloneThisProjectMoveTempFolder(
  props: CloneThisProjectMoveTempFolderProps,
) {
  assert<CloneThisProjectMoveTempFolderProps>({
    props,
    requiredProps: ['cloneThisProjectContext'],
  })

  if (props.cloneThisProjectContext.overrideOutputFolder) {
    await removeFolder({
      folderPath: props.cloneThisProjectContext.cloneProjectOutputPath,
    })
  }

  await moveFiles({
    sourcePath: props.cloneThisProjectContext.cloneProjectPath,
    targetPath: props.cloneThisProjectContext.cloneProjectOutputPath,
  })
}

export type CloneThisProjectMoveTempFolderReturn = ReturnType<
  typeof cloneThisProjectMoveTempFolder
>
