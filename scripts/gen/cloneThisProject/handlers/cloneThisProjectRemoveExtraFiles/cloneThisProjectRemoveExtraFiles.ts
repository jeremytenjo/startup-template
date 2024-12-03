import path from 'path'

import assert from '@useweb/assert'
import fs from 'fs-extra'

import type { CloneThisProjectContextSchema } from '../../CloneThisProjectContextSchema/CloneThisProjectContext.schema.js'

export type CloneThisProjectRemoveExtraFilesProps = {
  cloneThisProjectContext: CloneThisProjectContextSchema
}

export default async function cloneThisProjectRemoveExtraFiles(
  props: CloneThisProjectRemoveExtraFilesProps,
) {
  assert<CloneThisProjectRemoveExtraFilesProps>({
    props,
    requiredProps: ['cloneThisProjectContext'],
  })

  // Remove Files
  const filesToRemove = [
    '.git',
    '.next',
    'firebase-debug.log',
    'migration-storybook.log',
    'tsconfig.tsbuildinfo',
    'ui-debug.log',
    'playwright-report',
    'test-results',
    'src/lib/integrations/Roblox',
    'src/lib/integrations/EpicGames',
  ]

  await Promise.all(
    filesToRemove.map(async (file) => {
      await fs.remove(path.join(props.cloneThisProjectContext.cloneProjectPath, file))
    }),
  )

  // Empty Files Text

  const filesToEmpty = ['.env.local']

  await Promise.all(
    filesToEmpty.map(async (file) => {
      await fs.writeFile(
        path.join(props.cloneThisProjectContext.cloneProjectPath, file),
        '',
      )
    }),
  )
}

export type CloneThisProjectRemoveExtraFilesReturn = ReturnType<
  typeof cloneThisProjectRemoveExtraFiles
>
