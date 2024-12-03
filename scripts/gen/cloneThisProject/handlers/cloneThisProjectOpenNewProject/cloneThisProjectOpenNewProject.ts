import assert from '@useweb/assert'

import type { CloneThisProjectContextSchema } from '../../CloneThisProjectContextSchema/CloneThisProjectContext.schema.js'
import shell from '../../../../../devtools/utils/node/shell.js'

export type CloneThisProjectOpenNewProjectProps = {
  cloneThisProjectContext: CloneThisProjectContextSchema
}

export default async function cloneThisProjectOpenNewProject(
  props: CloneThisProjectOpenNewProjectProps,
) {
  assert<CloneThisProjectOpenNewProjectProps>({
    props,
    requiredProps: ['cloneThisProjectContext'],
  })
  // - open in new vscode window
  await shell(`code ${props.cloneThisProjectContext.cloneProjectOutputPath}`)
}

export type CloneThisProjectOpenNewProjectReturn = ReturnType<
  typeof cloneThisProjectOpenNewProject
>
