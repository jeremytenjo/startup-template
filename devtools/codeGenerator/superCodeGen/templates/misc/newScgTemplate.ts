import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

import addTemplateToSchema from '../../utils/addTemplateToSchema/addTemplateToSchema.js'

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: (p) => {
      return `${p.nameCamelCase}.ts`
    },
    template: (p) => {
      return `import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: (p) => {
      const fileName = \`\${p.nameCamelCase}\`

      return \`\${fileName}\`
    },
    template: () => {
      return \`\content\`
    },
  },
]

const ${p.nameCamelCase}: SuperCodeGeneratorTemplateSchema = {
  type: '${p.nameCapitalCase}',
  files,
}

export default ${p.nameCamelCase}`
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
