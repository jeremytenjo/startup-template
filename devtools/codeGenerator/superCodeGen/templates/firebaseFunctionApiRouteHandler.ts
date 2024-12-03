import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  // API Route Handler
  {
    path: ({ name }) => {
      return `${name}.ts`
    },
    template: ({ helpers, name }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)
      const capitalCase = helpers?.changeCase?.capitalCase(name)

      return `import assert from '@useweb/assert'
      import logger from 'firebase-functions/logger'
      
      import type { PropsInternal } from '../../rootFunction.js'
      
      export type ${namePascalCase}Props = PropsInternal
      
      export default async function ${nameCamelCase}(props: ${namePascalCase}Props) {
        try {
          assert<${namePascalCase}Props,>({ props, requiredProps: ['payload'] })
          assert<${namePascalCase}Props['payload'],>({
            props: props.payload,
            requiredProps: [],
          })
      
          const data = 'hi'
      
          logger.info('${capitalCase}', { data })
      
          return { data }
        } catch (error: any) {
          throw new Error(${'`'}${nameCamelCase} - ${'${String(error)}'}${'`'}, {
            cause: {
              ...props
              cause: error?.cause || {}
            }
          })
        }
      }
      
      export type ${namePascalCase}Return = ReturnType<typeof ${nameCamelCase}>
      
      `
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Firebase Function API Route Handler',
  files,
}

export default template
