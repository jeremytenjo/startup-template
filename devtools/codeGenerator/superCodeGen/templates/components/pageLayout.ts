import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const fileName = `${nameCamelCase}`

      return `${fileName}`
    },
    template: ({ name, helpers }) => {
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `import React from 'react'
import Box from '@useweb/ui/Box'

export type ${namePascalCase}LayoutProps = {
  children: React.ReactNode
}

export default function ${namePascalCase}Layout(props: ${namePascalCase}LayoutProps) {
  return (
    <Box data-id='${namePascalCase}Layout' sx={{}}>
      {props.children}
    </Box>
  )
}`
    },
  },
]

const pageLayout: SuperCodeGeneratorTemplateSchema = {
  type: 'Page Layout',
  files,
}

export default pageLayout
