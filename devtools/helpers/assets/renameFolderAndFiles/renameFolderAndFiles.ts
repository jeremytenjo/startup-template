import fs from 'fs'
import path from 'path'

import log from '../../../utils/node/log.js'
import capitalizeFirstLetter from '../../../../src/lib/utils/strings/capitalizeFirstLetter/capitalizeFirstLetter.js'

// rename folder and files in the folder that contain the string foldersFilesToRename to newName from dir folderPath
export default async function renameFolderAndFiles() {
  const foldersFilesToRename = 'Jobs'
  const folderPath = path.join(process.cwd(), 'test')
  const newName = 'Moco'

  const rename = async ({ folderPath, replaceUpperCase = false }) =>
    new Promise(async (resolve) => {
      const filesArr = fs.readdirSync(folderPath)

      await Promise.all(
        filesArr.map(async (file) => {
          const fullPath = path.join(folderPath, file)
          const isDirectory = fs.statSync(fullPath).isDirectory()

          if (isDirectory) {
            //  rename folder
            let renamedFolder = fullPath.replaceAll(foldersFilesToRename, newName)
            renamedFolder = fullPath.replaceAll(
              capitalizeFirstLetter({
                string: foldersFilesToRename,
              }),
              capitalizeFirstLetter({
                string: newName,
              }),
            )

            fs.renameSync(fullPath, renamedFolder)

            await rename({ folderPath: renamedFolder })
          }

          const fileExtension = path.extname(file)
          const fileName = path.basename(file, fileExtension)
          const newFileName = fileExtension ? fileName + fileExtension : fileName
          let updatedName = ''

          if (!replaceUpperCase) {
            updatedName = newFileName.replaceAll(foldersFilesToRename, newName)
          } else {
            const foldersFilesToRenameUpperCase = capitalizeFirstLetter({
              string: foldersFilesToRename,
            })
            const newNameUpperCase = capitalizeFirstLetter({
              string: newName,
            })

            updatedName = newFileName.replaceAll(
              foldersFilesToRenameUpperCase,
              newNameUpperCase,
            )
          }

          if (updatedName === '') {
            log('updatedName is empty', {
              error: true,
            })
          }

          try {
            fs.renameSync(fullPath, path.join(folderPath, updatedName))
          } catch (error: any) {
            console.error(error)
          }
        }),
      )

      resolve(true)
    })

  // match folder and files
  await rename({ folderPath })

  // match folder and files uppercase
  await rename({ folderPath, replaceUpperCase: true })
}
