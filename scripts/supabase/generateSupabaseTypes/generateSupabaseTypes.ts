import { spinner, intro, outro } from '@clack/prompts'
import chalk from 'chalk'

import shell from '../../../devtools/utils/node/shell.js'
import supabaseConfig from '../../../src/lib/integrations/Supabase/supabase.config.js'

export default async function generateSupabaseTypes() {
  const s = spinner()
  intro(chalk.cyan('generateSupabaseTypes'))
  s.start()

  await shell(`supabase gen types typescript --local > ${supabaseConfig.typesFilePath}`)

  s.stop()
  outro(chalk.green('Done'))
}
