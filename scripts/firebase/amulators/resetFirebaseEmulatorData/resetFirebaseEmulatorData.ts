// https://github.com/natemoo-re/clack/tree/main/packages/prompts#readme
import { spinner, intro, outro } from '@clack/prompts'
import chalk from 'chalk'

import resetFirebaseEmulatorDataClientFetch from '../../../../src/apiFunctions/resetFirebaseEmulatorData/resetFirebaseEmulatorData.fetch.js'

export default async function resetFirebaseEmulatorData() {
  intro(chalk.cyan('resetFirebaseEmulatorData'))
  const s = spinner()
  s.start('Resetting Firebase emulator data')

  try {
    const res = await resetFirebaseEmulatorDataClientFetch()
    s.stop()

    if (!res.error) {
      outro(chalk.green(`Done`))
    } else {
      outro(chalk.red(res.error))
    }
  } catch (error: any) {
    s.stop()
    outro(chalk.red(error))
  }
}
