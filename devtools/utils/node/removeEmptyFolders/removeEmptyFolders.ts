import path from 'path'
import fsPromises from 'fs/promises'

export type RemoveEmptyFoldersProps = {
  folderPath: string | string[]
}

async function removeEmptyFolder(folderPath: string) {
  // lstat does not follow symlinks (in contrast to stat)
  const fileStats = await fsPromises.lstat(folderPath)
  if (!fileStats.isDirectory()) {
    return
  }
  let fileNames = await fsPromises.readdir(folderPath)

  if (fileNames.length > 0) {
    const recursiveRemovalPromises = fileNames.map((fileName) => {
      return removeEmptyFolder(path.join(folderPath, fileName))
    })
    await Promise.all(recursiveRemovalPromises)

    // re-evaluate fileNames; after deleting subdirectory
    // we may have parent directory empty now
    fileNames = await fsPromises.readdir(folderPath)
  }

  if (fileNames.length === 0) {
    await fsPromises.rmdir(folderPath)
  }
}

export default async function removeEmptyFolders(props: RemoveEmptyFoldersProps) {
  const paths = Array.isArray(props.folderPath) ? props.folderPath : [props.folderPath]
  await Promise.all(
    paths.map((folderPath) => {
      return removeEmptyFolder(folderPath)
    }),
  )
}
