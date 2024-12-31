import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  // API Route
  {
    path: ({ name }) => {
      return `${name}.ts`
    },
    template: ({ helpers, name }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      const pascalCase = helpers?.changeCase?.pascalCase(name)

      return `import assert from '@useweb/assert'
      import type { CallableRequest } from 'firebase-functions/v2/https'
      import logger from 'firebase-functions/logger'
      
      export const routeId = 'routes/${camelCase}'
      
      export type API_${pascalCase}Props = {
        route: typeof routeId
        authUser: CallableRequest['auth']
        payload: {
          name: string
        }
        return: Awaited<${pascalCase}Return>
      }
      
      export type ${pascalCase}PropsInternal = Omit<
        API_${pascalCase}Props,
        'route' | 'return'
      >
      
      export default async function ${camelCase}(
        props: ${pascalCase}PropsInternal,
      ): ${pascalCase}Return {
        logger.info(${'`'}START: ${'${'}routeId${'}'}${'`'}, { props })

        assert<${pascalCase}PropsInternal>({
          props,
          requiredProps: ['payload'],
        })
        assert<API_${pascalCase}Props['payload']>({
          props: props.payload,
          requiredProps: ['name'],
        })

        const response: Awaited<${pascalCase}Return> = {
          data: [{ id: props.payload.name, success: true }],
        }

        logger.info(${'`'}END: ${'${'}routeId${'}'}${'`'}, { response })
      
        return response
      }
      
      export type ${pascalCase}Return = Promise<{
        data: {
          id: string
          success: boolean
        }[]
      }>
      `
    },
  },

  // API Route Stories
  {
    path: ({ name }) => {
      return `stories/${name}.stories.tsx`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      const pascalCase = helpers?.changeCase?.pascalCase(name)

      return `import React from 'react'
      import AsyncTester from '@useweb/async-tester'
      
      import rootFunctionClient from '../../../rootFunction.client.js'
      import type { API_${pascalCase}Props } from '../${camelCase}.js'
      
      export default {
        title:
          'Cloud Functions/firebase/rootFunction/routes/${camelCase}',
        parameters: {
          signInAs: false,
        },
      }
      
      const Template = () => {
        const fn = async () => {
          const res =
            await rootFunctionClient<API_${pascalCase}Props>(
              {
                api: {
                  route: 'routes/${camelCase}',
                  payload: {
                    name: 'hello',
                  },
                }
              },
            )
      
          return res
        }
      
        return (
          <>
            <AsyncTester<any, any> fn={fn} autoExec />
          </>
        )
      }
      
      export const Default = {
        render: () => {
          return <Template />
        },
      }`
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Firebase Function API Route',
  files,
}

export default template
