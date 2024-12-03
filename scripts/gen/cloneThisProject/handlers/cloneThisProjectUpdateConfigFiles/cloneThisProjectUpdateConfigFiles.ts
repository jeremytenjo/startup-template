import path from 'path'

import assert from '@useweb/assert'
import * as changeCase from 'change-case'

import replaceTextInFile from '../../../../../devtools/utils/node/replaceTextInFile/replaceTextInFile.js'
import createFile from '../../../../../devtools/utils/node/createFile.js'
import glob from '../../../../../devtools/utils/node/glob.js'
import type { CloneThisProjectContextSchema } from '../../CloneThisProjectContextSchema/CloneThisProjectContext.schema.js'
import removeFolder from '../../../../../devtools/utils/node/removeFolder.js'

export type CloneThisProjectUpdateConfigFilesProps = {
  cloneThisProjectContext: CloneThisProjectContextSchema
}

export default async function cloneThisProjectUpdateConfigFiles(
  props: CloneThisProjectUpdateConfigFilesProps,
) {
  assert<CloneThisProjectUpdateConfigFilesProps>({
    props,
    requiredProps: ['cloneThisProjectContext'],
  })

  // get all config files in project
  const configFiles = await glob({
    pattern: '**/*.config.{ts,js}',
    options: {
      ignore: '**/node_modules/**',
      cwd: props.cloneThisProjectContext.cloneProjectPath,
    },
  })

  await Promise.all(
    configFiles.map(async (configFile) => {
      const configFilePath = `${props.cloneThisProjectContext.cloneProjectPath}/${configFile}`
      const cloneProjectNameCapitalCase = changeCase.capitalCase(
        props.cloneThisProjectContext.cloneProjectName,
      )
      const cloneProjectNameLowerCase = changeCase
        .camelCase(props.cloneThisProjectContext.cloneProjectName)
        .toLocaleLowerCase()

      // App config
      if (configFilePath.includes('app.config')) {
        const appConfig = await import(configFilePath)

        await replaceTextInFile({
          filePath: configFilePath,
          changes: [
            {
              searchValue: appConfig.default.siteInfo.name,
              replaceValue: cloneProjectNameCapitalCase,
            },
            {
              searchValue: appConfig.default.siteInfo.domain,
              replaceValue: 'https://www.domain.com',
            },
            {
              searchValue: appConfig.default.siteInfo.previewDomain,
              replaceValue: 'https://www.previewDomain.com',
            },
            {
              searchValue: appConfig.default.siteInfo.description,
              replaceValue: 'description',
            },
            {
              searchValue: appConfig.default.siteInfo.title,
              replaceValue: 'title',
            },
          ],
        })
      }

      // Firebase
      if (configFilePath.includes('firebase.config')) {
        await createFile({
          filePath: configFilePath,
          overwrite: true,
          noTimestamp: true,
          fileContent: `export default {
  apiKey: undefined,
  authDomain: undefined,
  projectId: undefined,
  storageBucket: undefined,
  messagingSenderId: undefined,
  appId: undefined,
  measurementId: undefined,
}

export const firebaseReCaptchaEnterpriseSiteKey = undefined`,
        })

        await createFile({
          filePath: path.join(
            props.cloneThisProjectContext.cloneProjectPath,
            '.firebaserc',
          ),
          fileContent: `{
  "projects": {
    "default": ""
  }
}`,
          nojs: true,
          noTimestamp: true,
          overwrite: true,
        })
      }

      // Posthog
      if (configFilePath.includes('posthog.config')) {
        const postHogConfig = await import(configFilePath)

        await replaceTextInFile({
          filePath: configFilePath,
          changes: [
            {
              searchValue: `'${postHogConfig.default.id}'`,
              replaceValue: 'undefined',
            },
          ],
        })
      }

      // Resend
      if (configFilePath.includes('resend.config')) {
        const resendConfig = await import(configFilePath)

        await replaceTextInFile({
          filePath: configFilePath,
          changes: [
            {
              searchValue: resendConfig.default.senders.notifications,
              replaceValue: `notifications@${cloneProjectNameLowerCase}.com`,
            },
            {
              searchValue: resendConfig.default.senders.alerts,
              replaceValue: `alerts@${cloneProjectNameLowerCase}.com`,
            },
          ],
        })
      }

      // Algolia
      if (configFilePath.includes('algolia.config')) {
        await createFile({
          filePath: configFilePath,
          overwrite: true,
          noTimestamp: true,
          fileContent: `import algoliasearch from 'algoliasearch/lite'

const applicationId = ''
const searchOnlyApiKey = ''
const algoliaClient = algoliasearch(applicationId, searchOnlyApiKey)

export const algoliaConfig = {
  applicationId,
  searchOnlyApiKey,
  algoliaClient,
}`,
        })
      }

      // Supabase
      if (configFilePath.includes('generateSupabaseDevDatabase.config')) {
        await createFile({
          filePath: configFilePath,
          overwrite: true,
          noTimestamp: true,
          fileContent: `
const generateSupabaseDevDatabaseConfig: {
  extensions: {
    name: string
  }[]
  tables: {
    name: string
  }[]
} = {
  extensions: [],
  tables: [],
}

export default generateSupabaseDevDatabaseConfig`,
        })
      }

      // Prismic
      if (configFilePath.includes('prismic.config')) {
        await replaceTextInFile({
          filePath: configFilePath,
          changes: [
            {
              searchValue: props.cloneThisProjectContext.currentProjectName,
              replaceValue: changeCase
                .noCase(props.cloneThisProjectContext.cloneProjectName)
                .replace(/ /g, '-'),
            },
          ],
        })

        const prismicSlicesPath = path.join(
          props.cloneThisProjectContext.cloneProjectPath,
          'src/lib/integrations/Prismic/slices',
        )

        await removeFolder({
          folderPath: prismicSlicesPath,
        })

        await createFile({
          nojs: true,
          filePath: path.join(prismicSlicesPath, 'readme.md'),
          fileContent: `# Slices

This folder contains all the slices for the project.
          `,
        })
      }

      // Stripe
      if (configFilePath.includes('stripe.config')) {
        await createFile({
          filePath: configFilePath,
          overwrite: true,
          noTimestamp: true,
          fileContent: `export const stripeConfig = {
  webhooks: {
    listener: {
      forwardUrl: undefined
    },
  },
}
          `,
        })
      }

      // END
    }),
  )
}

export type CloneThisProjectUpdateConfigFilesReturn = ReturnType<
  typeof cloneThisProjectUpdateConfigFiles
>
