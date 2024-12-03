import fs from 'fs'

export default function removeFolder(props: { folderPath: string }) {
  // return null if path does not exist
  if (!fs.existsSync(props.folderPath)) {
    return null
  }

  return new Promise((resolve) => {
    fs.rm(props.folderPath, { recursive: true }, () => resolve(true))
  })
}
