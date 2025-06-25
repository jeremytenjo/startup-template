import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const fileName = `${nameCamelCase}`

      return `${fileName}/page.tsx`
    },
    template: ({ name, helpers }) => {
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `import React from 'react'
import Box from '@useweb/ui/Box'

export default function ${namePascalCase}Page() {
  return (
    <Box data-id='${namePascalCase}Page' sx={{}}>
      ${namePascalCase}Page
    </Box>
  )
}`
    },
  },
  {
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const fileName = `${nameCamelCase}`

      return `${fileName}/utils/readme.md`
    },
    template: ({ name, helpers }) => {
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `## ${namePascalCase} Utils

Add ${namePascalCase} utils here
`
    },
  },
  {
    path: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)
      const fileName = `${nameCamelCase}`

      return `${fileName}/containers/readme.md`
    },
    template: ({ name, helpers }) => {
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `## ${namePascalCase} containers

Add ${namePascalCase} containers here
`
    },
  },
]

const page: SuperCodeGeneratorTemplateSchema = {
  type: 'Page',
  files,
}

export default page
