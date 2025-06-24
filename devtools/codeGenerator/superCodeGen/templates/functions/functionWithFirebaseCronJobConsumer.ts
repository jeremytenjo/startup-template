import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

import addRouteToApi from '../../utils/addRouteToApi/addRouteToApi.js'
import getRelativeImportPath from '../../../../utils/node/getRelativeImportPath/getRelativeImportPath.js'
import findFileInFolder from '../../../../utils/node/findFileInFolder/findFileInFolder.js'
import addFunctionToFirebaseFunctionsFile from '../../utils/addFunctionToFirebaseFunctionsFile/addFunctionToFirebaseFunctionsFile.js'

import functionWithNodeTestingFirebaseCloudFunctionConsumer from './functionWithNodeTestingFirebaseCloudFunctionConsumer.js'

const files: SuperCodeGeneratorFilesSchema<any, any> = [
  ...functionWithNodeTestingFirebaseCloudFunctionConsumer.files,

  // firebase entry
  {
    path: ({ name, helpers }) => {
      const namePascalCase = helpers?.changeCase?.pascalCase(name)
      const fileName = `${namePascalCase}`

      return `consumers/firebaseCronJob/cron${fileName}.firebase.ts`
    },
    template: async ({ name, helpers, outputPath, workspacePath }) => {
      const namePascalCase = helpers?.changeCase?.pascalCase(name)
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const rawName = helpers?.changeCase?.camelCase(name.replace('cron', ''))
      const cronFunctionName = `cron${namePascalCase}Firebase`
      const logFirebaseCloudFunctionErrorFilePath = await findFileInFolder({
        folderPath: workspacePath || '',
        fileName: 'logFirebaseCloudFunctionError.ts',
      })
      const logFirebaseCloudFunctionErrorImportPath = getRelativeImportPath({
        fromPath: outputPath || '',
        toPath: logFirebaseCloudFunctionErrorFilePath.filePath,
      })

      return `import assert from '@useweb/assert'
import type { ScheduledEvent } from 'firebase-functions/v2/scheduler'
import logger from 'firebase-functions/logger'

import logFirebaseCloudFunctionError from '${logFirebaseCloudFunctionErrorImportPath.importPath}'
import ${nameCamelCase} from '../../${nameCamelCase}.js'

export type Cron${namePascalCase}Props = { scheduledEvent: ScheduledEvent }

export default async function ${cronFunctionName}(
  props: Cron${namePascalCase}Props,
) {
  logger.info('START', { props })
  assert<Cron${namePascalCase}Props>({
    props,
    requiredProps: ['scheduledEvent'],
  })

  try {
    const response = await ${rawName}({name: 'hello'})
    logger.info('END', { response })
  } catch (error: any) {
    logFirebaseCloudFunctionError({
      fnName: '${cronFunctionName}',
      description: error,
      metadata: error?.cause,
    })
  }
}

export type Cron${namePascalCase}Return = ReturnType<
  typeof ${cronFunctionName}
>`
    },
  },
]

const functionWithFirebaseCronJobConsumer: SuperCodeGeneratorTemplateSchema = {
  type: 'Function with Firebase Cron Job Consumer',
  files,
  hooks: {
    async onCreate(props) {
      await addRouteToApi({
        outputPath: props.outputPath,
        name: props.componentName,
        cloudFunctionName: 'nodeTestingApi',
        workspacePath: props.workspacePath,
      })

      const namePascalCase = props.helpers?.changeCase?.pascalCase(props.componentName)
      const functionName = `cron${namePascalCase}Firebase`

      await addFunctionToFirebaseFunctionsFile({
        functionName,
        workspacePath: props.workspacePath,
        fileName: `cron${namePascalCase}.firebase.ts`,
        exportFuncionExpression: `// Run every 24 hours
export const cron${namePascalCase} = onSchedule(
  {
    schedule: '0 0 * * *',
    memory: '1GiB',
    timeZone: 'America/New_York',
  },
  async (scheduledEvent) => {
    await ${functionName}({
      scheduledEvent,
    })
  },
)`,
      })
    },
  },
}

export default functionWithFirebaseCronJobConsumer
