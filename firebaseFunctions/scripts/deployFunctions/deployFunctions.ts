// https://github.com/enquirer/enquirer
import enquirer from 'enquirer'
import dotenv from 'dotenv'

import shell from '../../../devtools/utils/node/shell.js'
import buildFunctions from '../buildFunctions/buildFunctions.js'
import firebaseFunctionsConfig from '../../firebaseFunctions.config.js'

dotenv.config({ path: 'firebaseFunctions/.env.local' })

const { MultiSelect } = enquirer as any

export default async function deployFunctions() {
  try {
    await buildFunctions()
    console.log()

    const funs = await import('../../build/index.js')
    const cloudFunctions = Object.keys(funs) || []

    const validCloudFunctions = cloudFunctions.filter(
      (cloudFunction) => !firebaseFunctionsConfig.cli.ignoreList.includes(cloudFunction),
    )

    if (!validCloudFunctions.length)
      return console.log('No functions available to deploy')

    const prompt = new MultiSelect({
      name: 'selectedFunctionToDeploy',
      message: 'Which functions do you want to deploy?',
      choices: validCloudFunctions,
    })

    const answers = await prompt.run()

    if (!answers.length) return

    const answersString = `functions:${answers.join(',functions:')}`
    const command = `firebase deploy --only ${answersString}`

    shell(command)
  } catch (error: any) {
    throw new Error(error)
  }
}
