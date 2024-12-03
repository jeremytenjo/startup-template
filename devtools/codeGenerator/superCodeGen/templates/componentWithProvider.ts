import type {
  SuperCodeGeneratorFilesSchema,
  SuperCodeGeneratorTemplateSchema,
} from '@jeremytenjo/super-code-generator'

import story from './story.js'

const files: SuperCodeGeneratorFilesSchema<{
  folderPath: string
  slots?: {
    importOverride?: string
    storiesDefaultArgs?: string
    useDataImports?: string
    useDataTypeImportName?: string
  }
}> = [
  {
    path: ({ name, helpers }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)

      return `stories/${pascalCase}.stories.tsx`
    },
    template: ({ name, helpers, customProps }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)

      return story.getStoryTemplate({
        name: `${name}`,
        type: 'component',
        helpers,
        folderPath: customProps?.folderPath,
        importOverride: `import ${pascalCase}, { type ${pascalCase}Props } from '../${pascalCase}'
        ${customProps?.slots?.importOverride ? customProps?.slots?.importOverride : ''}`,
        storiesDefaultArgs: customProps?.slots?.storiesDefaultArgs || undefined,
      })
    },
  },
  {
    path: ({ name, helpers }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)

      return `use${pascalCase}Data/use${pascalCase}Data.tsx`
    },
    template: ({ name, helpers, customProps }) => {
      const pascalCase = `${helpers?.changeCase?.pascalCase(name)}Data`

      return `import React, { createContext, useContext } from 'react'

      ${customProps?.slots?.useDataImports || ''}

      export type ${pascalCase}Props = ${
        customProps?.slots?.useDataTypeImportName || 'any'
      }
      
      export type ${pascalCase}Return = ${pascalCase}Props
      
      export const ${pascalCase}Context = createContext<${pascalCase}Return>(undefined as any)

      type ${pascalCase}ProviderProps = {
        children: any
        props: ${pascalCase}Props
      }
      
      export const ${pascalCase}Provider = (props: ${pascalCase}ProviderProps) => {
        const data: ${pascalCase}Return = {
          ...props.props,
        }
      
        return (
          <${pascalCase}Context.Provider value={data}>{props.children}</${pascalCase}Context.Provider>
        )
      }
      
      const use${pascalCase} = () => useContext(${pascalCase}Context)
      
      export default use${pascalCase}
      
      `
    },
  },
  {
    path: ({ name, helpers }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)

      return `${pascalCase}.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)

      return `import React from 'react'
      import Box from '@useweb/ui/Box'
      import Text from '@useweb/ui/Text'
      import { ${pascalCase}DataProvider, type ${pascalCase}DataProps } from './use${pascalCase}Data/use${pascalCase}Data'

      export type ${pascalCase}Props = ${pascalCase}DataProps
      
      export default function ${pascalCase}(props: ${pascalCase}Props) {
        return (
          <${pascalCase}DataProvider props={props}>
          <Box data-id='${pascalCase}' sx={{}}>
              <Text text={'${pascalCase}'} tag='p' sx={{}} />
            </Box>
          </${pascalCase}DataProvider>
        )
      }

 
      `
    },
  },
  // story.docsTemplate(),
]

const template: SuperCodeGeneratorTemplateSchema<any> = {
  type: 'Component With Provider',
  files,
}

export default template
