import path from 'path'

import shell from '../../utils/node/shell.js'
import doesFolderOrFileExist from '../../utils/node/doesFolderOrFileExist.js'

export default function prepare() {
  const gitPath = path.join(process.cwd(), '.git')
  const hasGitPath = doesFolderOrFileExist(gitPath)

  if (hasGitPath) {
    shell('node ./node_modules/husky/lib/bin.js install')
  }
}
