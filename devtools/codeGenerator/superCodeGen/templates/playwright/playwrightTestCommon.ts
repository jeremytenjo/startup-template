import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: ({ name }) => {
      return `${name}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)

      return `import type { Page } from '@playwright/test'

      export type ${pascalCase}Props = { page: Page }
      
      export async function ${name}(props: ${pascalCase}Props) {
        // await
      }
      
      export type ${pascalCase}Return = ReturnType<typeof ${name}>
      
      
      `
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Playwright Common Test',
  files,
}

export default template
