import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

import functions from './function.js'

const files: SuperCodeGeneratorFilesSchema = [
  ...functions.files,

  {
    path: ({ name, helpers }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)
      const hookName = `use${pascalCase}`

      return `${hookName}.ts`
    },
    template: ({ name, helpers }) => {
      const camelCase = helpers?.changeCase?.camelCase(name)
      const pascalCase = helpers?.changeCase?.pascalCase(name)
      const propsName = `Use${pascalCase?.split(' ').join('')}Props`
      const returnName = `${helpers?.changeCase
        .capitalCase(name)
        .split(' ')
        .join('')}Return`
      const hookName = `use${pascalCase}`

      return `import { useMemo } from 'react' 
import type { PartialRequired } from '@useweb/use-data'


      import ${camelCase}, { type ${pascalCase}Props } from './${camelCase}'

      export type ${propsName} = PartialRequired<${pascalCase}Props>
    
      export default function ${hookName}(props: ${propsName}) {
        const data = useMemo(() => {
          const res = ${camelCase}()
          return res
        }, [props])
        
        return data
      }
      
      export type ${returnName} = ReturnType<typeof ${hookName}>
    `
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Function with Hook',
  files,
}

export default template
