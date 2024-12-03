import { spinner, intro, outro } from '@clack/prompts'
import chalk from 'chalk'

import shell from '../../../devtools/utils/node/shell.js'
import generateSupabaseDevDatabase from '../../../src/lib/integrations/Supabase/database/scripts/generateSupabaseDevDatabase/generateSupabaseDevDatabase.js'

export default async function resetSupabaseDatabaseData() {
  intro(chalk.cyan('resetSupabaseDatabaseData'))
  const s = spinner()
  s.start()
  await generateSupabaseDevDatabase()
  await shell('npx supabase db reset')
  s.stop()
  outro(chalk.green('Done'))
}
