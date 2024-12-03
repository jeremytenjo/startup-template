import { spinner, intro, outro } from '@clack/prompts'
import chalk from 'chalk'

import getTablesData from './handlers/getTablesData/getTablesData.js'
import createMigrationSqlFile from './handlers/createMigrationSqlFile/createMigrationSqlFile.js'
import createSeedSqlFile from './handlers/createSeedSqlFile/createSeedSqlFile.js'
import getDatabaseFunctions from './handlers/getDatabaseFunctions/getDatabaseFunctions.js'

export default async function generateSupabaseDevDatabase() {
  intro(chalk.cyan('generateSupabaseDevDatabase'))
  const s = spinner()
  s.start('generateSupabaseDevDatabase start')

  try {
    const { functions } = await getDatabaseFunctions()
    const { tables } = await getTablesData()
    await createMigrationSqlFile({ tables, functions })
    await createSeedSqlFile({ tables })
    s.stop()
    outro(chalk.green('Done'))
  } catch (error: any) {
    s.stop()
    outro(chalk.red(String(error)))
    {
      error?.cause && outro(chalk.red(JSON.stringify(error?.cause, null, 2)))
    }
  }
}
