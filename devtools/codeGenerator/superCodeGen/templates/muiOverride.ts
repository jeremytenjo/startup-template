import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: ({ name }) => `${name}.defaults.ts`,
    template: ({ name }) => {
      return `// https://mui.com/customization/theme-components/#global-style-overrides
      // import in src/theme/useweb/UsewebThemeProvider.js
      import { type ComponentDefaultsProps } from '@useweb/ui-theme'
      import { type ${name}Props } from '@useweb/ui/${name}'

      const defaults: ComponentDefaultsProps<${name}Props> = {
        styleOverrides: {
          root: {
            backgroundColor: 'red',
          },
        },
      }
      
      export default defaults`
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Component Defaults',
  files,
}

export default template
