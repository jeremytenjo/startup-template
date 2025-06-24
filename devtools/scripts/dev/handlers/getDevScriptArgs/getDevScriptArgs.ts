// https://github.com/enquirer/enquirer
import enquirer from 'enquirer'

import getCommandLineArgs from '../../../../utils/node/getCommandLineArgs.js'

type GetAppStateReturn = {
  signedIn: boolean
  dataSource: 'dev' | 'prod'
  onlyApp: boolean
  runPlaywright: boolean
}

export default async function getDevScriptArgs(): Promise<GetAppStateReturn> {
  const scriptArgs = getCommandLineArgs([
    { name: 'signedIn', type: Boolean, defaultValue: true },
    { name: 'dataSource', type: String },
    {
      name: 'onlyApp',
      type: Boolean,
      defaultValue: false,
    },
    {
      name: 'runPlaywright',
      type: Boolean,
      defaultValue: false,
    },
  ])

  // https://github.com/enquirer/enquirer#-built-in-prompts
  const prompts = [
    {
      type: 'confirm',
      name: 'signedIn',
      message: 'Is user signed in?',
      skip: scriptArgs.signedIn !== undefined,
      initial: Boolean(scriptArgs.signedIn),
    },

    {
      type: 'select',
      name: 'dataSource',
      message: 'Data source',
      skip: scriptArgs.dataSource !== undefined,
      choices: ['dev', 'prod'],
      initial: 'dev',
    },

    {
      type: 'confirm',
      name: 'onlyApp',
      message: 'Only run nextjs app?',
      skip: scriptArgs.onlyApp !== undefined,
      initial: Boolean(scriptArgs.onlyApp),
    },
    {
      type: 'confirm',
      name: 'runPlaywright',
      message: 'Run Playwright tests?',
      skip: scriptArgs.runPlaywright !== undefined,
      initial: Boolean(scriptArgs.runPlaywright),
    },

    // add more as needed here...
  ]

  const data: GetAppStateReturn = await enquirer.prompt(prompts)

  return data
}
