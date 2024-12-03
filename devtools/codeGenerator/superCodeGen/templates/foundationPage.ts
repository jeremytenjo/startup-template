import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: ({ name, helpers }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)
      const newName = `foundationPage${pascalCase}.ts`

      return newName
    },
    template: ({ name, helpers }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)

      return `import type { FoundationPageReturn } from '../../cloneThisProjectResetPagesFolders.ts'

      export default function foundationPage${pascalCase}() : FoundationPageReturn {

        const data: FoundationPageReturn = {
          name: '${name}'
        }

        return data
      }
      
      `
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Foundation Page',
  files,
}

export default template
