import type { Dirent } from 'fs'
import { promises as fs } from 'fs'
import path from 'path'

import assert from '@useweb/assert'

export type GetFilesInFolderProps = { path: string }

export async function getFilesInFolderRecursive(props: {
  folderPath: string
}): Promise<string[]> {
  let files: string[] = []
  const items: Dirent[] = await fs.readdir(props.folderPath, { withFileTypes: true })

  for (const item of items) {
    const fullPath = path.join(props.folderPath, item.name)
    if (item.isDirectory()) {
      files = files.concat(await getFilesInFolderRecursive({ folderPath: fullPath }))
    } else {
      files.push(fullPath)
    }
  }

  return files
}

export default async function getFilesInFolder(props: GetFilesInFolderProps) {
  assert<GetFilesInFolderProps>({ props, requiredProps: ['path'] })

  // Ensure the folder path is absolute or adjust accordingly
  const folderPath = path.resolve(props.path)

  try {
    const files = await getFilesInFolderRecursive({ folderPath })
    return { files }
  } catch (error) {
    console.error('Error reading the folder:', error)
    return { files: [], error: 'Error reading the folder' }
  }
}

export type GetFilesInFolderReturn = ReturnType<typeof getFilesInFolder>
