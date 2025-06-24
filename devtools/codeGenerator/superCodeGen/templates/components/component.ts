import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const functionWithComponentName = 'Function with Component'

type CustomProps = {
  type: string
  slots?: {
    localComponents?: {
      localComponentsDeclarations: string
      localComponents: string
    }
  }
}

const files: SuperCodeGeneratorFilesSchema<CustomProps> = [
  {
    path: ({ name, helpers, customProps }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)
      const isFunctionWithComponent = customProps?.type === functionWithComponentName

      const prefix = isFunctionWithComponent ? 'ui/' : ''
      const componentNameAffix = isFunctionWithComponent ? `Ui` : ''
      const componentName = `${pascalCase}${componentNameAffix}`

      return `${prefix}${componentName}.tsx`
    },
    template: ({ name, helpers, customProps }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)
      const camelCase = helpers?.changeCase?.camelCase(name)
      const isFunctionWithComponent = customProps?.type === functionWithComponentName
      const componentNameAffix = isFunctionWithComponent ? `Ui` : ''
      const componentName = `${pascalCase}${componentNameAffix}`
      const propsName = `${componentName}Props`

      return `import React from 'react'       
    import Box, { type BoxProps } from '@useweb/ui/Box'
    import Text from '@useweb/ui/Text'
${isFunctionWithComponent ? `import ErrorMessage from '@useweb/ui/ErrorMessage'` : ''}
    ${
      isFunctionWithComponent
        ? `import use${pascalCase} from '../use${pascalCase}/use${pascalCase}'`
        : ''
    }

    export type ${propsName} = { 
      sx?: BoxProps['sx']
    }
  
    export default function ${componentName}(props: ${propsName}) {
      ${
        isFunctionWithComponent
          ? `const ${camelCase} = use${pascalCase}()
console.log(${camelCase})`
          : ''
      }
      return (
        <Box data-id='${componentName}' sx={{
        ...props.sx
        }}>
          <Text text={'${componentName}'} tag='p' sx={{}} />
          ${
            isFunctionWithComponent
              ? `<ErrorMessage error={${camelCase}.error} message='Error' />`
              : ''
          }
          ${customProps?.slots?.localComponents?.localComponentsDeclarations || ''}
        </Box>
      );
    }

    ${customProps?.slots?.localComponents?.localComponents || ''}

      `
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema<CustomProps> = {
  type: 'Component',
  files,
}

export default template
