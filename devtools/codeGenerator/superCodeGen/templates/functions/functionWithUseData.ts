import type { SuperCodeGeneratorTemplateSchema } from '@jeremytenjo/super-code-generator'

import functions from './function.js'

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Function with useData',
  files: [
    ...functions.files,
    {
      path: ({ name, helpers }) => {
        const pascalCase = helpers?.changeCase?.pascalCase(name)

        return `use${pascalCase}/use${pascalCase}.ts`
      },
      template: ({ name, helpers }) => {
        const pascalCase = helpers?.changeCase?.pascalCase(name)
        const propsName = `${pascalCase}Props`
        const returnName = `${pascalCase}Return`

        return `import useData, { createUseDataId, type PartialRequired } from '@useweb/use-data'

import _${name}, {
  type ${propsName},
  type ${returnName},
} from '../${name}.js'
 
import logError from '@/lib/utils/loggers/logError/logError'

export type Use${propsName} = PartialRequired<${propsName}>

export const get${pascalCase}DataId = (props: Use${propsName}) => {
  const id = createUseDataId<${propsName}>({
    name: '${name}',
    props,
  })
  return id
}

export default function use${pascalCase}(props: Use${propsName}) {
  const fetcherProps: Use${propsName} = {
    name: props.name,
  }

  const ${name} = useData<
    Awaited<${returnName}>['data'][0],
    ${propsName}
  >({
    id: get${pascalCase}DataId(props).id,
    get: {
      fetcher: async () => {
        const ${name}Res = await _${name}(
          fetcherProps as ${propsName},
        )

        if (${name}Res) {
          return ${name}Res.data
        }

        return []
      },
      onGetError({ error }) {
        logError({
          error,
          fnName: 'use${pascalCase}',
          metadata: { props },
        })
      },
    },
  })

  return ${name}
}

export type Use${returnName} = ReturnType<
  typeof use${pascalCase}
>
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
  ],
}

export default template
