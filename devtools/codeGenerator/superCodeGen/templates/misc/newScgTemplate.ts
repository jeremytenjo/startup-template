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
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const fileName = \`\${nameCamelCase}\`

      return \`\${fileName}\`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const namePascalCase = helpers?.changeCase?.pascalCase(name)
      
      return \`\content\`
    },
  },
]

const ${helpers?.changeCase?.camelCase(name)}: SuperCodeGeneratorTemplateSchema = {
  type: '${helpers?.changeCase?.capitalCase(name)}',
  files,
}

export default ${helpers?.changeCase?.camelCase(name)}
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
