import type {
  SuperCodeGeneratorTemplateSchema,
  SuperCodeGeneratorFilesSchema,
} from '@jeremytenjo/super-code-generator'

import story from '../misc/story.js'

import functions from './function.js'

const files: SuperCodeGeneratorFilesSchema<any> = [
  ...functions.files,
  ...story.functionStoryFiles,
  {
    path: ({ name, helpers }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)

      return `use${pascalCase}/use${pascalCase}.ts`
    },
    template: ({ name, helpers }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)
      const camelCase = helpers?.changeCase?.camelCase(name)

      return `import useAsync, { type UseAsyncProps } from '@useweb/use-async'
import logError from '@/src/lib/utils/loggers/logError/logError'

import ${camelCase}Fn, { type ${pascalCase}Props, type ${pascalCase}Return } from '../${camelCase}.js'

type Use${pascalCase}Props = Omit<
  UseAsyncProps<any, Awaited<${pascalCase}Return>>,
 'fn'>

export default function use${pascalCase}(props: Use${pascalCase}Props = {}) {
  const ${camelCase} = useAsync<
  ${pascalCase}Props, 
  Awaited<ReturnType<typeof ${name}Fn>>
  >({     fn: async (p) => {
    const data = await ${camelCase}Fn(p)
    return data
  },
  onError({ error, fnProps }) {
    logError({
      error,
      fnName: 'use${pascalCase}',
      metadata: { props, fnProps },
    })
  },
  ...props, })

  return ${camelCase}
}
    `
    },
  },

  // ui - readme
  {
    path: () => {
      return `ui/readme.md`
    },
    template: ({ name, helpers }) => {
      const nameCamelCase = helpers?.changeCase?.camelCase(name)

      return `# ${nameCamelCase} UI
  
  Add components that consume '${nameCamelCase}' query here.`
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Function with useAsync',
  files,
}

export default template
