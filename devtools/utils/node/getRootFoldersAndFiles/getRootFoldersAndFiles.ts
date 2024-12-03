import fsExtra from 'fs-extra'

export type GetRootFoldersAndFilesProps = { dirPath: string }

export default async function getRootFoldersAndFiles(props: GetRootFoldersAndFilesProps) {
  const filesAndFolders = (await fsExtra.readdir(props.dirPath)) as string[]

  return { filesAndFolders }
}

export type GetRootFoldersAndFilesReturn = ReturnType<typeof getRootFoldersAndFiles>
