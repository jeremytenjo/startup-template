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
      return `import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: ({ name }) => {
      return name
    },
    template: ({ name }) => {
      return 'hello'
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: '${helpers?.changeCase?.capitalCase(name)}',
  files,
}

export default template
    `
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Super Code Generator Template',
  files,
  options: {
    createNamedFolder: false,
  },
}

export default template
