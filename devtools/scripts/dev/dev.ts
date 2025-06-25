import getNextjsDevCommand from '../../../lib/integrations/Nextjs/utils/getNextjsDevCommand/getNextjsDevCommand.js'
import getStorybookDevCommand from '../../../lib/integrations/Storybook/utils/getStorybookDevCommand/getStorybookDevCommand.js'
import shellDashboard, {
  type DevCommandProps,
} from '../../utils/terminal/shellDashboard.js'

import getDevScriptArgs from './handlers/getDevScriptArgs/getDevScriptArgs.js'

export default async function dev() {
  const devScriptArgs = await getDevScriptArgs()
  const startStorybook = !devScriptArgs.onlyApp
  const commands: DevCommandProps[] = []

  // nextjs
  const nextjsCommand = await getNextjsDevCommand({
    dataSource: devScriptArgs.dataSource,
  })

  commands.push(nextjsCommand.devCommand)

  // storybok
  if (startStorybook) {
    const storybookCommand = await getStorybookDevCommand()

    commands.push(storybookCommand.devCommand)
  }

  // run commands
  shellDashboard({ commands })
}
