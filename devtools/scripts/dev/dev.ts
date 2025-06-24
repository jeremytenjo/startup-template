import appConfig from '../../../app.config.js'
import shellDashboard, { type CommandProps } from '../../utils/terminal/shellDashboard.js'

import getDevScriptArgs from './handlers/getDevScriptArgs/getDevScriptArgs.js'

export default async function dev() {
  const devScriptArgs = await getDevScriptArgs()

  const startApp = true
  const startStorybook = !devScriptArgs.onlyApp

  const commands: CommandProps[] = []

  // nextjs
  if (startApp) {
    const nextjsCommand: CommandProps = {
      label: 'Nextjs',
      command: {
        root: 'node',
        args: `--experimental-json-modules --loader ts-node/esm node_modules/.bin/next dev -p ${appConfig.nextjs.port}`,
        env: {
          DATA_SOURCE: devScriptArgs.dataSource,
        },
      },
      ports: [appConfig.nextjs.port],
      color: '#fff',
    }
    commands.push(nextjsCommand)
  }

  // storybok
  if (startStorybook) {
    const storybookCommand: CommandProps = {
      label: `Storybook`,
      command: {
        root: 'npm',
        args: 'run storybook:dev',
      },
      ports: [appConfig.devtools.storybook.port],
      color: '#FF4785',
    }
    commands.push(storybookCommand)
  }

  // playwright
  if (devScriptArgs.runPlaywright) {
    const playwrightCommand: CommandProps = {
      label: `Playwright`,
      command: {
        root: 'npm',
        args: 'run tests:playwright:run:all',
      },
      ports: [],
      color: '#45ba4b',
      waitForPorts: {
        ports: [appConfig.nextjs.port],
        message: 'Waiting for dev to run',
      },
      onCommandEnd: () => {
        process.exit(0)
      },
      onCommandError: () => {
        process.exit(1)
      },
    }

    commands.push(playwrightCommand)
  }

  // run commands
  shellDashboard({ commands })
}
