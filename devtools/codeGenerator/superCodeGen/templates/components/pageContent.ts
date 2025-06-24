import changeCase from 'change-case'
import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema<{
  slots?: {
    childContainers?: {
      importStatements?: string
      importedComponents?: string
    }
  }
}> = [
  {
    parentFolderName: ({ name }) => {
      const pascalName = changeCase.pascalCase(name).split(' ').join('')
      return pascalName
    },
    path: ({ name }) => {
      const pascalName = changeCase.pascalCase(name).split(' ').join('')
      return `${pascalName}Page.tsx`
    },
    template: ({ name, customProps = {} }) => {
      const pascalName = changeCase.pascalCase(name).replaceAll(' ', '')
      const componentName = `${pascalName}Page`

      return `
      import React from 'react'
      import Box from '@useweb/ui/Box'
      
      import ${componentName}Layout from './${componentName}.layout.js'

    ${customProps?.slots?.childContainers?.importStatements || ''}


export default function ${componentName}() {
  return (
    <${componentName}Layout>
      <Box data-id='${componentName}' sx={{}}>
      ${customProps?.slots?.childContainers?.importedComponents || pascalName}
      </Box>
    </${componentName}Layout>
  )
}

`
    },
  },
  {
    parentFolderName: ({ name }) => {
      const pascalName = changeCase.pascalCase(name).split(' ').join('')
      return pascalName
    },
    path: ({ name }) => {
      const pascalName = changeCase.pascalCase(name).split(' ').join('')
      const componentName = `${pascalName}Page.layout`

      return `${componentName}.tsx`
    },
    template: ({ name }) => {
      const pascalName = changeCase.pascalCase(name).replaceAll(' ', '')
      const componentName = `${pascalName}PageLayout`

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      
      export type ${componentName}Props = { children: any }
      
      export default function ${componentName}(props: ${componentName}Props) {
        return (
          <Box data-id='${componentName}' sx={{}}>
            {props.children}
          </Box>
        )
      }
      `
    },
  },
  {
    parentFolderName: ({ name }) => {
      const pascalName = changeCase.pascalCase(name).split(' ').join('')
      return pascalName
    },
    path: () => {
      return `containers/readme.md`
    },
    template: ({ name }) => {
      const pascalName = changeCase.pascalCase(name).replaceAll(' ', '')
      const componentName = `${pascalName}Page`

      return `## ${componentName} Containers

        Containers are components that are used to pass data to other components. They are used to separate data fetching from the components that use the data.
      `
    },
  },
  {
    parentFolderName: ({ name }) => {
      const pascalName = changeCase.pascalCase(name).split(' ').join('')
      return pascalName
    },
    path: () => {
      return `pages/readme.md`
    },
    template: () => {
      return `## Sub Pages

        Add sub pages here
      `
    },
  },
  {
    parentFolderName: ({ name }) => {
      const pascalName = changeCase.pascalCase(name).split(' ').join('')
      return pascalName
    },
    path: () => {
      return `utils/readme.md`
    },
    template: () => {
      return `## Page Utils

        Add page utils here
      `
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Page Content',
  files,
}

export default template
