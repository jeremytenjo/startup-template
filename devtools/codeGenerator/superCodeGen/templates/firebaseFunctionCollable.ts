import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  // Raw Function
  {
    path: ({ name }) => `${name}.ts`,
    template: ({ name, helpers }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)
      const propsName = `${pascalCase}Props`
      const returnName = `${pascalCase}Return`

      return `import type { CallableRequest } from 'firebase-functions/v2/https'

      export type ${propsName} = {
        authUser: CallableRequest['auth'] | undefined
        payload: {
          name: string
        }
      }
      
      export default async function ${name}(
        props: ${propsName},
      ): Promise<${returnName}> {
        console.log('props', props)
      
        return {
          name: props.payload.name,
        }
      }
      
      export type ${returnName} = {
        name: string
      }
      `
    },
  },
  // Client Function - to use in the client (React, js, etc)
  {
    path: ({ name }) => `${name}.client.ts`,
    template: ({ name, helpers }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)

      return `import { httpsCallable } from 'firebase/functions'
      import useAsync from '@useweb/use-async'
      
      import { functions } from '../../../../src/lib/integrations/Google/Firebase/firebase.js'
      import logError from '../../../../src/lib/utils/loggers/logError/logError.js'
      
      import type { ${pascalCase}Props, ${pascalCase}Return } from './${name}.js'
      
      export type ${pascalCase}ClientProps = ${pascalCase}Props['payload']
      
      export default async function ${name}Client(props: ${pascalCase}ClientProps) {
        const ${name} = httpsCallable<any, any>(functions, '${name}')
        const res = await ${name}(props)
      
        return res.data as ${pascalCase}Return
      }
      
      export function use${pascalCase}() {
        const ${name}Res = useAsync<
          ${pascalCase}ClientProps,
          ${pascalCase}Return
        >({
          fn: async (p) => {
            const res = await ${name}Client(p)
            return res
          },
          onError({ error, fnProps }) {
            logError({
              error,
              fnName: 'use${pascalCase}',
              metadata: { fnProps },
            })
          },
        })
      
        return ${name}Res
      }`
    },
  },
  // Firebase Index
  {
    path: ({ name }) => `${name}.firebase.ts`,
    template: ({ name, helpers }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)
      const propsName = `${pascalCase}Props`

      return `import type { CallableRequest } from 'firebase-functions/v2/https'
      import logger from 'firebase-functions/logger'

      import logFirebaseCloudFunctionError from '../../utils/logFirebaseCloudFunctionError/logFirebaseCloudFunctionError.js'
      
      import type { ${propsName} } from './${name}.js'
      import ${name} from './${name}.js'
      
      export type ${pascalCase}FirebaseProps = {
        request: CallableRequest<any>
      }
      
      export default async function ${name}Firebase(
        props: ${pascalCase}FirebaseProps,
      ) {
        try {
          logger.info(${'`'}START${'`'}, { props })

          const res = await ${name}({
            authUser: props.request.auth,
            payload: props.request.data as ${propsName}['payload'],
          })

          logger.info(${'`'}END${'`'}, { res })

          return res
        } catch (error: any) {
          logFirebaseCloudFunctionError({
            fnName: '${name}',
            description: error,
            uid: props.request?.auth?.uid,
            throwHttpsError: true,
            metadata: error?.cause,
          })
        }
      }
      `
    },
  },
  // Story
  {
    path: ({ name }) => `stories/${name}.stories.tsx`,
    template: ({ name, helpers }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)

      return `//https://storybook.js.org/docs/react/writing-docs/docs-page
      // https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs?ref=storybook-blog
      import React from 'react'
      import AsyncTester from '@useweb/async-tester'
      
      import {
        type ${pascalCase}Props,
        type ${pascalCase}Return,
      } from '../${name}.js'
      import ${name}Client from '../${name}.client.js'
      
      const defaultArgs: ${pascalCase}Props['payload'] = {
        name: '${name}',
      }
      
      export default {
        title: 'Cloud Functions/firebase/${name}',
        args: defaultArgs,
        parameters: {
          signInAs: false,
        },
      }
      
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const Template = (args: ${pascalCase}Props['payload']) => {
        const fn = async (triggerProps = {}) => {
          return await ${name}Client({ ...args, ...triggerProps })
        }
      
        return (
          <>
            <AsyncTester<${pascalCase}Return, ${pascalCase}Props> fn={fn} autoExec />
          </>
        )
      }
      
      export const Default = {
        render: (args: ${pascalCase}Props['payload']) => {
          return <Template {...args} />
        },
      }
      
      // export const Variant = {
      //  ...Default,
      //  args: {
      //  ...defaultArgs,
      // } satisfies ${pascalCase}Props
      // }
      `
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Firebase Function Collable',
  files,
}

export default template
