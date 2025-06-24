import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: ({ name }) => {
      return `${name}Schema/${name}.schema.tsx`
    },
    template: ({ name }) => {
      return `export type ${name}Schema = any`
    },
  },
  {
    path: ({ name }) => {
      const stubsName = `${name}Schema/${lowerCaseFirst(name)}.stubs.tsx`

      return stubsName
    },
    template: ({ name }) => {
      const nameLowerCaseFirst = lowerCaseFirst(name)
      const stubName = `${nameLowerCaseFirst}Stubs`

      return `import type { ${name}Schema } from './${name}.schema'

      const ${stubName}: ${name}Schema[] = []
      
      export default ${stubName}
      
      `
    },
  },
]

function lowerCaseFirst(s) {
  return s[0].toLowerCase() + s.slice(1)
}

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'TS Schema',
  files,
  options: {
    createNamedFolder: false,
  },
}

export default template
