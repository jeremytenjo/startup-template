import fs from 'fs/promises'

import * as changeCase from 'change-case'
import assert from '@useweb/assert'

import type { CloneThisProjectContextSchema } from '../../CloneThisProjectContextSchema/CloneThisProjectContext.schema.js'

export type CloneThisProjectUpdatePackageJsonNameProps = {
  cloneThisProjectContext: CloneThisProjectContextSchema
}

export default async function cloneThisProjectUpdatePackageJsonName(
  props: CloneThisProjectUpdatePackageJsonNameProps,
) {
  assert<CloneThisProjectUpdatePackageJsonNameProps>({
    props,
    requiredProps: ['cloneThisProjectContext'],
  })

  const packageJsonPath = `${props.cloneThisProjectContext.cloneProjectPath}/package.json`

  const packageJsonContent = await fs.readFile(packageJsonPath, 'utf8')
  const packageJson = JSON.parse(packageJsonContent)

  packageJson.name = changeCase.paramCase(props.cloneThisProjectContext.cloneProjectName)

  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8')
}

export type CloneThisProjectUpdatePackageJsonNameReturn = ReturnType<
  typeof cloneThisProjectUpdatePackageJsonName
>
