import fs from 'fs-extra'
import prettier from 'prettier'

import prettierConfig from '../../prettier/prettier.config.js'

import doesFolderOrFileExist from './doesFolderOrFileExist.js'

type Props = {
  filePath: string
  fileContent: string
  nojs?: boolean
  noTimestamp?: boolean
  overwrite?: boolean
}

export default async function createFile({
  filePath,
  fileContent,
  nojs,
  noTimestamp,
  overwrite = false,
}: Props) {
  const exists = await doesFolderOrFileExist(filePath)

  if (exists && !overwrite) {
    return
  }

  const formateed = nojs
    ? fileContent
    : await prettier.format(noTimestamp ? fileContent : addTimestamp(fileContent), {
        ...(prettierConfig as any),
        parser: 'babel-ts',
      })

  fs.outputFileSync(filePath, formateed)
}

const addTimestamp = (fileContent) => {
  const fileContentWithTimestamp = `
  /**
 * DON'T EDIT THIS FILE
 * This file is auto generated
 */
  
  ${fileContent}
  `
  return fileContentWithTimestamp
}
