import path from 'path'

import enquirer from 'enquirer'
import assert from '@useweb/assert'

import removeFolder from '../../../../../devtools/utils/node/removeFolder.js'
import type { CloneThisProjectContextSchema } from '../../CloneThisProjectContextSchema/CloneThisProjectContext.schema.js'
import getCommandLineArgs from '../../../../../devtools/utils/node/getCommandLineArgs.js'

export type CloneThisProjectAskQuestionsProps = {
  cloneThisProjectContext: CloneThisProjectContextSchema
}

export default async function cloneThisProjectAskQuestions(
  props: CloneThisProjectAskQuestionsProps,
) {
  assert<CloneThisProjectAskQuestionsProps>({
    props,
    requiredProps: ['cloneThisProjectContext'],
  })

  const scriptArgs = getCommandLineArgs([
    { name: 'name', alias: 'n', type: String },
    {
      name: 'overrideOutputFolder',
      type: Boolean,
    },
  ])

  let cloneProjectName = scriptArgs.name

  // If the project name wasn't provided via CLI, ask for it
  if (!cloneProjectName) {
    const response = await enquirer.prompt<{ cloneProjectName: string }>({
      type: 'input',
      name: 'cloneProjectName',
      message: 'What is the name of the new project?',
    })

    cloneProjectName = response.cloneProjectName
  }

  const cloneProjectPath = path.join(process.cwd(), `_${cloneProjectName}`)

  await removeFolder({ folderPath: cloneProjectPath })

  return {
    cloneProjectName,
    cloneProjectPath,
    overrideOutputFolder: scriptArgs.overrideOutputFolder,
  }
}

export type CloneThisProjectAskQuestionsReturn = ReturnType<
  typeof cloneThisProjectAskQuestions
>
