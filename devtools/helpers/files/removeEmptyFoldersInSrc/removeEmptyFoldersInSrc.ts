import path from 'path'

import { spinner, intro, outro } from '@clack/prompts'
import chalk from 'chalk'

import removeEmptyFolders from '../../../utils/node/removeEmptyFolders/removeEmptyFolders.js'

export default async function removeEmptyFoldersInSrc() {
  console.clear()
  intro(chalk.cyan('removeEmptyFoldersInSrc'))
  const s = spinner()
  s.start('Removing empty folders')

  const srcPath = path.join(process.cwd(), 'src')

  await removeEmptyFolders({
    folderPath: srcPath,
  })

  s.stop('Empty folders removed')
  outro(chalk.green(`Done`))
}
