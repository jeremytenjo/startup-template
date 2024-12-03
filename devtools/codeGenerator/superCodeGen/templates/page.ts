import changeCase from 'change-case'
import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

type CustomProps = {
  extra?: {
    imports?: string
  }
}

const files: SuperCodeGeneratorFilesSchema<CustomProps> = [
  {
    parentFolderName: ({ name }) => {
      const pascalName = changeCase.paramCase(name).split(' ').join('-')
      return pascalName
    },
    path: () => `index.tsx`,
    template: ({ name, customProps }) => {
      const upperName = changeCase.capitalCase(name).split(' ').join('')
      const spaceName = changeCase.capitalCase(name).split(' ').join('-')

      return `import React from 'react' 

${customProps?.extra?.imports || ''}
import RootLayout from '@/src/lib/layouts/RootLayout/RootLayout.js'

export default function ${upperName}PageRoot() {
  return <>
   <RootLayout title='${spaceName}'>
      <${upperName}Page />
   </RootLayout>
  </>
}`
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema<CustomProps> = {
  type: 'Page',
  files,
}

export default template
