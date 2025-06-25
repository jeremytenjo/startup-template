import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

import addTemplateToSchema from '../../utils/addTemplateToSchema/addTemplateToSchema.js'

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

export default ${helpers?.changeCase?.camelCase(name)}`
    },
  },
]

const newScgTemplate: SuperCodeGeneratorTemplateSchema = {
  type: 'Super Code Generator Template',
  files,
  options: {
    createNamedFolder: false,
  },
  hooks: {
    onCreate: async ({ outputPath, componentName, workspacePath }) => {
      await addTemplateToSchema({
        templatePath: outputPath,
        workspacePath,
        name: componentName,
      })
    },
  },
}

export default newScgTemplate
