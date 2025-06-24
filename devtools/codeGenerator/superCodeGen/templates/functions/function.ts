import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      return `${camelCase}.ts`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      const propsName = `${helpers?.changeCase
        ?.pascalCase(name)
        .split(' ')
        .join('')}Props`
      const returnName = `${helpers?.changeCase
        .capitalCase(name)
        .split(' ')
        .join('')}Return`

      return `import assert from '@useweb/assert'
      
export type ${propsName} = {name: string}
    
    export default async function ${camelCase}(props: ${propsName}) {
      assert<${propsName},>({ props, requiredProps: ['name'] })

      const data = []
      
      return { data }
    }
    
    export type ${returnName} = ReturnType<typeof ${camelCase}>
    `
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Function',
  files,
}

export default template
