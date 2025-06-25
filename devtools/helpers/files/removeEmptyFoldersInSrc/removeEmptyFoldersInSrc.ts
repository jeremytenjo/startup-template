import path from 'path'

import { spinner, intro, outro } from '@clack/prompts'
import chalk from 'chalk'

import removeEmptyFolders from '../../../utils/node/removeEmptyFolders/removeEmptyFolders.js'

export default async function removeEmptyFoldersInSrc() {
  console.clear()
  intro(chalk.cyan('Remove Empty Folders in app, lib, and data'))
  const s = spinner()
  s.start('Removing empty folders')

  const app = path.join(process.cwd(), 'app')
  const lib = path.join(process.cwd(), 'lib')
  const data = path.join(process.cwd(), 'data')

  await removeEmptyFolders({
    folderPath: [app, lib, data],
  })

  s.stop('Empty folders removed')
  outro(chalk.green(`Done`))
}
