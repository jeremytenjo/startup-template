import fs from 'fs'
import path from 'path'

export type FindFileInFolderProps = {
  folderPath: string
  fileName: string
}

export default async function findFileInFolder(props: FindFileInFolderProps) {
  let foundFile: string = ''

  const searchFolder = async (currentPath: string) => {
    const files = await fs.promises.readdir(currentPath)

    for (const file of files) {
      if (file === 'node_modules') {
        continue
      }

      const filePath = path.join(currentPath, file)
      const stats = await fs.promises.stat(filePath)

      if (stats.isFile() && file === props.fileName) {
        foundFile = filePath
      }

      if (stats.isDirectory()) {
        await searchFolder(filePath)
      }
    }
  }

  await searchFolder(props.folderPath)

  if (!foundFile) {
    throw new Error(`File ${props.fileName} not found in folder ${props.folderPath}`)
  }

  return { filePath: foundFile }
}

export type FindFileInFolderReturn = ReturnType<typeof findFileInFolder>
