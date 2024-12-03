import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: ({ name, helpers }) => {
      return `${helpers?.changeCase?.camelCase(name)}.ts`
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

      return `export type ${propsName} = {name: string}
    
    export default function ${camelCase}(props: ${propsName}) {
      const data = 'hi'
      
      return { data }
    }
    
    export type ${returnName} = ReturnType<typeof ${camelCase}>
    `
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Hook - React',
  files,
}

export default template
