import fs from 'fs-extra'

export type MoveFilesProps = {
  sourcePath: string
  targetPath: string
}

export default async function moveFiles(props: MoveFilesProps) {
  await fs.move(props.sourcePath, props.targetPath)
}

export type MoveFilesReturn = ReturnType<typeof moveFiles>
