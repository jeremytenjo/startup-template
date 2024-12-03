import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  // API Route
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      return `${camelCase}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)
      const camelCase = helpers?.changeCase?.camelCase(name)

      return `import assert from '@useweb/assert'

      import logger from 'firebase-functions/logger'

      export const routeId = 'routes/${camelCase}'
      
      export type API_${pascalCase}Props = {
        route: typeof routeId
        payload: {
          name: string
        }
        return: Awaited<${pascalCase}Return>
      }
      
      export type ${pascalCase}PropsInternal = Omit<API_${pascalCase}Props, 'route' | 'return'>
      
      export default async function ${camelCase}(
        props: ${pascalCase}PropsInternal,
      ): ${pascalCase}Return {
        logger.info(${'`'}START: ${'${'}routeId${'}'}${'`'}, { props })

        assert<${pascalCase}PropsInternal>({ props, requiredProps: ['payload'] })
        assert<API_${pascalCase}Props['payload']>({
          props: props.payload,
          requiredProps: [],
        })
      
        const response: Awaited<${pascalCase}Return> = {
          data: {
            name: props.payload.name,
          }
        }

        logger.info(${'`'}END: ${'${'}routeId${'}'}${'`'}, { response })
      
        return response
      }
      
      export type ${pascalCase}Return = Promise<{
        data: any
      }>`
    },
  },
  // API Route Stories
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      return `stories/${camelCase}.stories.tsx`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      const pascalCase = helpers?.changeCase?.pascalCase(name)

      return `import React from 'react'
      import AsyncTester from '@useweb/async-tester'
      
      import roofunctionnameClient from '../../../roofunctionname.client.js'
      import type { API_${pascalCase}Props } from '../${camelCase}.js'
      
      export default {
        title: 'Cloud Functions/firebase/roofunctionname/routes/${camelCase}',
        parameters: {
          signInAs: false,
        },
      }
      
      const Template = () => {
        const fn = async () => {
          const res = await roofunctionnameClient<API_${pascalCase}Props>({
            route: 'routes/${camelCase}',
            payload: {
              name: 'hello',
            },
          })
      
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
      }
      `
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Firebase Function HTTP API Route',
  files,
}

export default template
