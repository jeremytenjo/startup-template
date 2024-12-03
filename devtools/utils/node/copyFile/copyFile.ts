import fsExtra from 'fs-extra'
import { type CopyOptions } from 'fs-extra'

export type CopyFileProps = {
  sourcePath: string
  targetPath: string
  options?: CopyOptions
}

export default async function copyFile(props: CopyFileProps) {
  await fsExtra.copy(props.sourcePath, props.targetPath, props.options)
}

export type CopyFileReturn = ReturnType<typeof copyFile>
