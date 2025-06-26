import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: () => {
      return `page.tsx`
    },
    template: (p) => {
      return `import React from 'react'
import Box from '@useweb/ui/Box'

export default function ${p.namePascalCase}Page() {
  return (
    <Box data-id='${p.namePascalCase}Page' sx={{}}>
      ${p.namePascalCase}Page
    </Box>
  )
}`
    },
  },
  {
    path: () => {
      return `utils/readme.md`
    },
    template: ({ name, helpers }) => {
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `## ${namePascalCase} Utils

Add ${namePascalCase} utils here
`
    },
  },
  {
    path: () => {
      return `containers/readme.md`
    },
    template: ({ name, helpers }) => {
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `## ${namePascalCase} containers

Add ${namePascalCase} containers here
`
    },
  },
  {
    path: () => {
      return `(pages)/readme.md`
    },
    template: ({ name, helpers }) => {
      const namePascalCase = helpers?.changeCase?.pascalCase(name)

      return `## ${namePascalCase} children pages

Add ${namePascalCase} children pages here
`
    },
  },
]

const page: SuperCodeGeneratorTemplateSchema = {
  type: 'Page',
  files,
}

export default page
